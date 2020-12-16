package online.inabsurdum.jambox.arrangement;

import online.inabsurdum.jambox.songpart.SongPart;
import org.springframework.stereotype.Service;

@Service
public class ArrangementServiceImpl implements ArrangementService {

  private final ArrangementRepository arrangementRepository;

  public ArrangementServiceImpl(ArrangementRepository arrangementRepository) {
    this.arrangementRepository = arrangementRepository;
  }

  @Override
  public Arrangement create(long trackId) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Arrangement insertNewSongPart(long id, SongPart songPart)
    throws ArrangementNotFoundException {
    Arrangement arrangement = arrangementRepository.findById(id);
    if (arrangement == null) {
      throw new ArrangementNotFoundException(
        "Arrangement with id: " + id + " was not found."
      );
    }
    arrangement.getSongParts().add(songPart);
    arrangementRepository.save(arrangement);
    return arrangement;
  }

  @Override
  public Arrangement findById(long id) {
    return arrangementRepository.findById(id);
  }
}
