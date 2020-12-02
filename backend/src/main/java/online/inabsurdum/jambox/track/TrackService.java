package online.inabsurdum.jambox.track;

import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import online.inabsurdum.jambox.playlist.PlaylistNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface TrackService {
  TrackDTO find(long id) throws TrackNotFoundException;

  TrackDTO upload(String title, long playlistId, MultipartFile file)
    throws PlaylistNotFoundException, NoSuchAlgorithmException, IOException, TrackDecodingException, PeakGenerationException, InterruptedException, PeakNormalizationException;

  List<TrackDTO> findAll();

  void rename(long id, String newTitle);

  void changePlaylist(long id, long currentPlaylistId, long newPlaylistId) throws PlaylistNotFoundException;

  void delete(long id);

  Resource loadFileAsResource(String checksum);

  File loadFileWithOriginalFilename(long id);

  void deleteDownloadedTempFile(long id);
}
