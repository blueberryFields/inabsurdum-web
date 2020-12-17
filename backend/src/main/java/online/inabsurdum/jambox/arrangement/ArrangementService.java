package online.inabsurdum.jambox.arrangement;

import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartCantBeMovedException;
import online.inabsurdum.jambox.songpart.SongPartNotFoundException;

public interface ArrangementService {
  Arrangement create(long trackId);

  Arrangement insertNewSongPart(long arrangementId, SongPart songPart)
    throws ArrangementNotFoundException;

  Arrangement findById(long id);

  void moveSongPartUp(long songPartId, long arrangementId)
    throws SongPartNotFoundException, SongPartCantBeMovedException;

  void moveSongPartDown(long songPartId, long arrangementId)
    throws SongPartNotFoundException, SongPartCantBeMovedException;

  void reorderArrSequence(long arrangementId);
}
