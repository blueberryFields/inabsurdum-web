package online.inabsurdum.jambox.arrangement;

import java.util.List;
import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartService;
import org.springframework.stereotype.Service;

@Service
public class ArrangementServiceImpl implements ArrangementService {

  private final ArrangementRepository arrangementRepository;
  private final SongPartService songPartService;

  public ArrangementServiceImpl(
    ArrangementRepository arrangementRepository,
    SongPartService songPartService
  ) {
    this.arrangementRepository = arrangementRepository;
    this.songPartService = songPartService;
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

  @Override
  public moveSongPartUp(long songPartId, long arrangementId) {
    Arrangement arrangement = arrangementRepository.findById(arrangementId);
    List<SongPart> songParts = arrangement.getSongParts();

    SongPart partToMoveUp = null;
    for (SongPart songPart : songParts) {
      if (songPart.getId() == songPartId) {
        partToMoveUp = songPart;
      }
    }
    // TODO: throw exception if partToMoveUp.getArrSequenceNo() < 1
    SongPart partToMoveDown = null;
    if (partToMoveUp != null) {
      for (SongPart songPart : songParts) {
        if (
          songPart.getArrSequenceNo() == partToMoveUp.getArrSequenceNo() - 1
        ) {
          partToMoveDown = songPart;
        }
      }
    }
    System.out.println(
      "To move up: id: " +
      partToMoveUp.getId() +
      ", arrSNo: " +
      partToMoveUp.getArrSequenceNo()
    );
    System.out.println(
      "To move down: id: " +
      partToMoveDown.getId() +
      ", arrSNo: " +
      partToMoveDown.getArrSequenceNo()
    );
    //TODO: else throw exception
    if (partToMoveUp != null && partToMoveDown != null) {
      songPartService.moveUp(partToMoveUp.getId());
      songPartService.moveDown(partToMoveDown.getId());
    }
    //TODO: else throw exception

  
    ;
  }
}
