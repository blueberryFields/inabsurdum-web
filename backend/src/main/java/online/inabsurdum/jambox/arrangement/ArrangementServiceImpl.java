package online.inabsurdum.jambox.arrangement;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartCantBeMovedException;
import online.inabsurdum.jambox.songpart.SongPartNotFoundException;
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
    Arrangement arrangement = arrangementRepository.findById(id);
    List<SongPart> songParts = arrangement.getSongParts();
    songParts.sort(Comparator.comparing(SongPart::getArrSequenceNo));
    return arrangement;
  }

  @Override
  public void moveSongPartUp(long songPartId, long arrangementId)
    throws SongPartNotFoundException, SongPartCantBeMovedException {
    Arrangement arrangement = arrangementRepository.findById(arrangementId);
    List<SongPart> songParts = arrangement.getSongParts();

    SongPart partToMoveUp = null;
    for (SongPart songPart : songParts) {
      if (songPart.getId() == songPartId) {
        partToMoveUp = songPart;
      }
    }
    if (partToMoveUp == null) {
      throw new SongPartNotFoundException("Couldnt find song part to move up");
    }
    if (
      partToMoveUp.getArrSequenceNo() < 1
    ) throw new SongPartCantBeMovedException(
      "Song part already is at top of the order"
    );

    SongPart partToMoveDown = null;
    for (SongPart songPart : songParts) {
      if (songPart.getArrSequenceNo() == partToMoveUp.getArrSequenceNo() - 1) {
        partToMoveDown = songPart;
      }
    }
    if (partToMoveDown == null) throw new SongPartNotFoundException(
      "Couldnt find song part to move down"
    );

    songPartService.moveUp(partToMoveUp.getId());
    songPartService.moveDown(partToMoveDown.getId());
  }

  @Override
  public void moveSongPartDown(long songPartId, long arrangementId)
    throws SongPartNotFoundException, SongPartCantBeMovedException {
    Arrangement arrangement = arrangementRepository.findById(arrangementId);
    List<SongPart> songParts = arrangement.getSongParts();

    SongPart partToMoveDown = null;
    for (SongPart songPart : songParts) {
      if (songPart.getId() == songPartId) {
        partToMoveDown = songPart;
      }
    }
    if (partToMoveDown == null) {
      throw new SongPartNotFoundException(
        "Couldnt find song part to move down"
      );
    }
    Optional<SongPart> highestArrSeqNo = songParts
      .stream()
      .max(Comparator.comparing(SongPart::getArrSequenceNo));
    if (
      partToMoveDown.getArrSequenceNo() ==
      highestArrSeqNo.get().getArrSequenceNo()
    ) throw new SongPartCantBeMovedException(
      "Song part already is at bottom of the order"
    );

    SongPart partToMoveUp = null;
    for (SongPart songPart : songParts) {
      if (
        songPart.getArrSequenceNo() == partToMoveDown.getArrSequenceNo() + 1
      ) {
        partToMoveUp = songPart;
      }
    }
    if (partToMoveUp == null) throw new SongPartNotFoundException(
      "Couldnt find song part to move up"
    );

    songPartService.moveUp(partToMoveUp.getId());
    songPartService.moveDown(partToMoveDown.getId());
  }

  @Override
  public void reorderArrSequence(long arrangementId) {
    Arrangement arrangement = arrangementRepository.findById(arrangementId);
    List<SongPart> songParts = arrangement.getSongParts();
    songParts.sort(Comparator.comparing(SongPart::getArrSequenceNo));

    for (int i = 0; i < songParts.size(); i++) {
      SongPart songPart = songParts.get(i);
      if (songPart.getArrSequenceNo() != i) songPart.setArrSequenceNo(i);
    }
    arrangementRepository.save(arrangement);
  }

  @Override
  public Arrangement pasteArrangement(long from, long to)
    throws ArrangementNotFoundException {
    Arrangement fromArrangement = arrangementRepository.findById(from);
    Arrangement toArrangement = arrangementRepository.findById(to);
    if (
      fromArrangement == null || toArrangement == null
    ) throw new ArrangementNotFoundException("Couldnt find arrangment");

    List<SongPart> fromSongParts = fromArrangement.getSongParts();
    List<SongPart> toSongParts = new ArrayList<>();

    for (SongPart fromSongPart : fromSongParts) {
      SongPart toSongPart = new SongPart();
      toSongPart.setArrSequenceNo(fromSongPart.getArrSequenceNo());
      toSongPart.setTitle(fromSongPart.getTitle());
      toSongPart.setStartingAt(fromSongPart.getStartingAt());
      toSongPart.setEndingAt(fromSongPart.getEndingAt());
      toSongPart.setLyrics(fromSongPart.getLyrics());
      toSongParts.add(toSongPart);
    }

    toArrangement.setSongParts(toSongParts);

    return arrangementRepository.save(toArrangement);
  }
}
