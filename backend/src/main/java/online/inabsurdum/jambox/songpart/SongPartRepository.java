package online.inabsurdum.jambox.songpart;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SongPartRepository extends CrudRepository<SongPart, Long> {
  SongPart findById(long id);

  @Query(
    value = "SELECT MAX(arr_sequence_no) FROM song_part WHERE id IN(SELECT id FROM song_part WHERE arrangement_id = ?1)",
    nativeQuery = true
  )
  int findMaxArrSequensNo(long id);
}
