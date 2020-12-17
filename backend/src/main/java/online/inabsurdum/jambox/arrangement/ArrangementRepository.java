package online.inabsurdum.jambox.arrangement;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface ArrangementRepository
  extends CrudRepository<Arrangement, Long> {
  Arrangement findById(long id);
  Arrangement findById(long id, Sort sort);
}
