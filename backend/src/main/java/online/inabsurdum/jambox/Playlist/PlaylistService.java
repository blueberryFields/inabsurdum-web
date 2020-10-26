package online.inabsurdum.jambox.Playlist;

import java.util.List;

public interface PlaylistService {

    PlaylistDTO create(String title);

    List<PlaylistDTO> findAll();

    PlaylistDTO rename(long id, String newTitle);

    void delete(long id);
}
