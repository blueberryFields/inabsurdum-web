package online.inabsurdum.jambox.playlist;

import java.util.List;

public interface PlaylistService {

    List<PlaylistDTO> create(String title, long userId);

    List<PlaylistDTO> findAll();

    List<PlaylistDTO> findByUserId(long userId);

    List<PlaylistDTO> rename(long id, String newTitle, long userId);

    List<PlaylistDTO> delete(long id, long userId);

    List<ReducedPlaylistDTO> findReducedByUserId(long userId);
}
