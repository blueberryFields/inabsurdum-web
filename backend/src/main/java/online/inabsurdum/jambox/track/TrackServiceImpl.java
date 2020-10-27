package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.Playlist.Playlist;
import online.inabsurdum.jambox.Playlist.PlaylistNotFoundException;
import online.inabsurdum.jambox.Playlist.PlaylistRepository;
import online.inabsurdum.jambox.storage.StorageService;
import online.inabsurdum.jambox.storage.UploadLocation;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;
    private final StorageService storageService;

    public TrackServiceImpl(TrackRepository trackRepository, PlaylistRepository playlistRepository, StorageService storageService) {
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
        this.storageService = storageService;
    }

    @Override
    public TrackDTO create(String title, long playlistId, MultipartFile multipartFile) throws PlaylistNotFoundException, NoSuchAlgorithmException, IOException, TrackDecodingException {
        String filename = storageService.store(multipartFile, UploadLocation.TEMPFILE);
        File file = storageService.load(filename, UploadLocation.TEMPFILE);
        String checksum = getFileChecksum(MessageDigest.getInstance("MD5"), file);

        Track result = trackRepository.findFirstByChecksum(checksum);
        String duration = "";
        if (result != null) {
            storageService.delete(file, UploadLocation.TEMPFILE);
            duration = result.getDuration();
        } else {
            duration = getDurationOfTrack(file);
            storageService.moveAndRenameFile(file, checksum, UploadLocation.TRACK);
        }

        return create(title, playlistId, duration, checksum);
    }

    private String getDurationOfTrack(File file) throws TrackDecodingException {
        String duration = "";
        try {
            // create the ffmpeg process command to run.
            Process ffprobe = new ProcessBuilder(
                    "/opt/local/bin/ffprobe", // mac: "/opt/local/bin/ffmpeg" linux: "/usr/bin/ffmpeg"
                    "-v", "error",
                    "-show_entries", "format=duration",
                    "-of", "default=noprint_wrappers=1:nokey=1",
                    "-sexagesimal",
                    file.getAbsolutePath())
                    .start();
            // this blocks until the execute is complete.
            ffprobe.waitFor();
            if (0 != ffprobe.exitValue()) {
                // a non-zero exit value means something blew up
                // log.error("ffmpeg failed! Exit value: {}", ffmpeg.exitValue());
                throw new TrackDecodingException("ffprobe failed! Exit value: " + ffprobe.exitValue());
            }
            // Read the output
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(ffprobe.getInputStream()));
            duration = reader.readLine();
        } catch (IOException e) {
            // log.error("Unable to run ffmpeg", e);
            throw new TrackDecodingException("Unable to run ffmpeg", e);
        } catch (InterruptedException e) {
            // you could potentially get this thrown from the waitFor() call.
            // log.error("Interupted!", e);
            System.out.println("Interupted!!!");
            throw new TrackDecodingException("ffmpeg was interupted!", e);
        }
        return duration;
    }


    private TrackDTO create(String title, long playlistId, String duration, String checksum) throws PlaylistNotFoundException {
        Track track = new Track();
        track.setTitle(title);
        track.setDuration(duration);
        track.setUploadedAt(new Date());
        track.setChecksum(checksum);

        track = trackRepository.save(track);

        Playlist playlist = playlistRepository.findById(playlistId);
        if (playlist == null) throw new PlaylistNotFoundException();
        List<Track> tracks = playlist.getTracks();
        tracks.add(track);
        playlist.setTracks(tracks);
        playlistRepository.save(playlist);

        return new TrackDTO(track);
    }

    private static String getFileChecksum(MessageDigest digest, File file) throws IOException, FileNotFoundException {
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

    @Override
    public List<TrackDTO> findAll() {
        List<Track> tracks = trackRepository.findAll();
        return convertTracksToTrackDTOs(tracks);
    }

    @Override
    public TrackDTO rename(long id, java.lang.String newTitle) {
        Track track = trackRepository.findById(id);
        track.setTitle(newTitle);
        return new TrackDTO(trackRepository.save(track));
    }

    @Override
    public void delete(long id) {
        trackRepository.deleteById(id);
    }

    private List<TrackDTO> convertTracksToTrackDTOs(List<Track> tracks) {
        List<TrackDTO> trackDTOs = new ArrayList<>();
        for (Track track : tracks) {
            trackDTOs.add(new TrackDTO(track));
        }
        return trackDTOs;
    }
}
