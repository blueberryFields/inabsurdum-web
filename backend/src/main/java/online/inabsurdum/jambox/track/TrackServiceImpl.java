package online.inabsurdum.jambox.track;

import java.io.*;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import online.inabsurdum.jambox.playlist.Playlist;
import online.inabsurdum.jambox.playlist.PlaylistNotFoundException;
import online.inabsurdum.jambox.playlist.PlaylistRepository;
import online.inabsurdum.jambox.storage.StorageService;
import online.inabsurdum.jambox.storage.UploadLocation;
import org.hibernate.cfg.CreateKeySecondPass;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TrackServiceImpl implements TrackService {

  private final TrackRepository trackRepository;
  private final PlaylistRepository playlistRepository;
  private final StorageService storageService;

  public TrackServiceImpl(
    TrackRepository trackRepository,
    PlaylistRepository playlistRepository,
    StorageService storageService
  ) {
    this.trackRepository = trackRepository;
    this.playlistRepository = playlistRepository;
    this.storageService = storageService;
  }

  @Override
  public TrackDTO upload(
    String title,
    long playlistId,
    MultipartFile multipartFile
  )
    throws PlaylistNotFoundException, NoSuchAlgorithmException, IOException, TrackDecodingException, PeakGenerationException, InterruptedException, PeakNormalizationException {
    String filename = storageService.store(
      multipartFile,
      UploadLocation.TEMPFILE
    );
    File file = storageService.load(filename, UploadLocation.TEMPFILE);
    String checksum = getFileChecksum(MessageDigest.getInstance("MD5"), file);

    Track result = trackRepository.findFirstByChecksum(checksum);

    String duration;
    String peaks;
    String originalFilename;
    if (result != null) {
      storageService.delete(file, UploadLocation.TEMPFILE);
      duration = result.getDuration();
      peaks = result.getPeaks();
      originalFilename = result.getOriginalFilename();
    } else {
      duration = getDurationOfTrack(file);
      peaks = generatePeakData(file).toString();
      originalFilename = file.getName();
      storageService.moveAndRenameFile(file, checksum, UploadLocation.TRACK);
    }

    return create(
      title,
      playlistId,
      duration,
      checksum,
      peaks,
      originalFilename
    );
  }

  private String getDurationOfTrack(File file) throws TrackDecodingException {
    String duration = "";
    try {
      Process ffprobe = new ProcessBuilder(
        "/usr/bin/ffprobe", // mac: "/opt/local/bin/ffmpeg" linux: "/usr/bin/ffmpeg"
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        "-sexagesimal",
        file.getAbsolutePath()
      )
        .start();

      ffprobe.waitFor();
      if (0 != ffprobe.exitValue()) {
        throw new TrackDecodingException(
          "ffprobe failed! Exit value: " + ffprobe.exitValue()
        );
      }
      // Read the output
      BufferedReader reader = new BufferedReader(
        new InputStreamReader(ffprobe.getInputStream())
      );
      duration = reader.readLine();
    } catch (IOException e) {
      throw new TrackDecodingException("Unable to run ffmpeg", e);
    } catch (InterruptedException e) {
      System.out.println("Interupted!!!");
      throw new TrackDecodingException("ffmpeg was interupted!", e);
    }
    return duration;
  }

  private JSONObject generatePeakData(File file)
    throws IOException, PeakGenerationException, InterruptedException, PeakNormalizationException {
    Process audiowaveform = new ProcessBuilder(
      "/usr/bin/audiowaveform",
      "-i",
      file.getAbsolutePath(),
      "--pixels-per-second",
      "20",
      "--bits",
      "8",
      "-o",
      "temp-files/peaks.json"
    )
      .start();
    audiowaveform.waitFor();
    if (0 != audiowaveform.exitValue()) {
      throw new PeakGenerationException(
        "Audiowaveform failed! Exit value: " + audiowaveform.exitValue()
      );
    }
    normalisePeakData();

    return readPeakAndDeleteFile();
  }

  // This seems to fuck stuff up, keeping it for reference though
  private void normalisePeakData()
    throws IOException, InterruptedException, PeakNormalizationException {
    Process python = new ProcessBuilder(
      "python",
      "scale-json.py",
      "temp-files/peaks.json"
    )
      .start();
    python.waitFor();
    if (0 != python.exitValue()) {
      throw new PeakNormalizationException(
        "Normalization script failed! Exit value: " + python.exitValue()
      );
    }
  }

  private JSONObject readPeakAndDeleteFile() throws FileNotFoundException {
    Path path = storageService
      .getRootLocation(UploadLocation.TEMPFILE)
      .resolve("peaks.json");
    InputStream is = new FileInputStream(String.valueOf(path));
    JSONTokener tokener = new JSONTokener(is);
    storageService.deleteByFilename("peaks.json", UploadLocation.TEMPFILE);
    return new JSONObject(tokener);
  }

  private static String getFileChecksum(MessageDigest digest, File file)
    throws IOException, FileNotFoundException {
    //Get file input stream for reading the file content
    FileInputStream fis = new FileInputStream(file);
    //Create byte array to read data in chunks
    byte[] byteArray = new byte[1024];
    int bytesCount = 0;
    //Read file data and update in message digest
    while ((bytesCount = fis.read(byteArray)) != -1) {
      digest.update(byteArray, 0, bytesCount);
    }
    //close the stream; We don't need it now.
    fis.close();
    //Get the hash's bytes
    byte[] bytes = digest.digest();
    //This bytes[] has bytes in decimal format;
    //Convert it to hexadecimal format
    StringBuilder sb = new StringBuilder();
    for (byte aByte : bytes) {
      sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
    }
    //return complete hash
    return sb.toString();
  }

  private TrackDTO create(
    String title,
    long playlistId,
    String duration,
    String checksum,
    String peaks,
    String originalFilename
  )
    throws PlaylistNotFoundException {
    Track track = new Track();
    track.setTitle(title);
    track.setDuration(duration);
    track.setUploadedAt(new Date());
    track.setChecksum(checksum);
    track.setPeaks(peaks);
    track.setOriginalFilename(originalFilename);

    track = trackRepository.save(track);

    Playlist playlist = playlistRepository.findById(playlistId);
    if (playlist == null) throw new PlaylistNotFoundException();
    List<Track> tracks = playlist.getTracks();
    tracks.add(track);
    playlist.setTracks(tracks);
    playlistRepository.save(playlist);

    return new TrackDTO(track);
  }

  @Override
  public List<TrackDTO> findAll() {
    List<Track> tracks = trackRepository.findAll();
    return convertTracksToTrackDTOs(tracks);
  }

  @Override
  public void rename(long id, String title) {
    Track track = trackRepository.findById(id);
    if (title != track.getTitle()) {
      track.setTitle(title);
      trackRepository.save(track);
    }
  }

  @Override
  public void changePlaylist(
    long id,
    long currentPlaylistId,
    long newPlaylistId
  )
    throws PlaylistNotFoundException {
    Track track = trackRepository.findById(id);

    //Remove track from current playlist
    Playlist currentPlaylist = playlistRepository.findById(currentPlaylistId);
    if (currentPlaylist == null) throw new PlaylistNotFoundException();
    List<Track> tracks = currentPlaylist.getTracks();
    tracks.removeIf(obj -> obj.id == id);
    currentPlaylist.setTracks(tracks);

    playlistRepository.save(currentPlaylist);

    //Add track to new playlist
    Playlist newPlaylist = playlistRepository.findById(newPlaylistId);
    if (newPlaylist == null) throw new PlaylistNotFoundException();
    tracks = newPlaylist.getTracks();
    tracks.add(track);
    newPlaylist.setTracks(tracks);
    playlistRepository.save(newPlaylist);
  }

  @Override
  public void delete(long id) {
    Track track = trackRepository.findById(id);
    List<Track> tracks = trackRepository.findTracksByChecksum(
      track.getChecksum()
    );
    if (tracks.size() == 1) {
      storageService.deleteByFilename(
        track.getChecksum(),
        UploadLocation.TRACK
      );
    }
    trackRepository.deleteById(id);
  }

  @Override
  public Resource loadFileAsResource(String checksum) {
    return storageService.loadFileAsResource(UploadLocation.TRACK, checksum);
  }

  @Override
  public File loadFileWithOriginalFilename(long id) {
    Track track = trackRepository.findById(id);
    System.out.println(
      track.getChecksum() + ", " + track.getOriginalFilename()
    );
    return storageService.loadFileWithOriginalFilename(
      track.getChecksum(),
      track.getOriginalFilename()
    );
  }

  @Override
  public void deleteDownloadedTempFile(long id) {
    Track track = trackRepository.findById(id);
    storageService.deleteByFilename(
      track.getOriginalFilename(),
      UploadLocation.TEMPFILE
    );
  }

  private List<TrackDTO> convertTracksToTrackDTOs(List<Track> tracks) {
    List<TrackDTO> trackDTOs = new ArrayList<>();
    for (Track track : tracks) {
      trackDTOs.add(new TrackDTO(track));
    }
    return trackDTOs;
  }

  @Override
  public TrackDTO find(long id) throws TrackNotFoundException {
    Track track = trackRepository.findById(id);
    if (track != null) {
      return new TrackDTO(track);
    } else {
      throw new TrackNotFoundException("Track with id " + id + " not found.");
    }
  }
}
