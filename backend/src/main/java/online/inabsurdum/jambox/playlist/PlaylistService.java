package online.inabsurdum.jambox.playlist;

import java.util.List;

public interface PlaylistService {

    PlaylistDTO create(String title, long userId);

    List<PlaylistDTO> findAll();

    List<PlaylistDTO> findByUserId(long userId);

    PlaylistDTO rename(long id, String newTitle);

    void delete(long id);

    List<ReducedPlaylistDTO> findReducedByUserId(long userId);
}
