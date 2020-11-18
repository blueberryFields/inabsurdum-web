package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.playlist.PlaylistNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface TrackService {

    TrackDTO upload(String title, long playlistId, MultipartFile file) throws PlaylistNotFoundException, NoSuchAlgorithmException, IOException, TrackDecodingException, PeakGenerationException, InterruptedException, PeakNormalizationException;

    List<TrackDTO> findAll();

    TrackDTO rename(long id, java.lang.String newTitle);

    void delete(long id);

    Resource loadFileAsResource(String checksum);

    Resource loadFileAsResourceWithOriginalFilename(String checksum);

    void deleteDownloadedTempFile(String checksum);
}
