package online.inabsurdum.jambox.Playlist;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlaylistRepository extends CrudRepository<Playlist, Long> {
    List<Playlist> findAll();
}
