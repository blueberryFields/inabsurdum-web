package online.inabsurdum.jambox.track;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TrackRepository extends CrudRepository<Track, Long> {
    List<Track> findAll();

    Track findById(long id);

    Track findFirstByChecksum(String checksum);
}
