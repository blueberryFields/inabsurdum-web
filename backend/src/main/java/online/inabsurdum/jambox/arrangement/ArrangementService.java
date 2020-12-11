package online.inabsurdum.jambox.arrangement;

import online.inabsurdum.jambox.songpart.SongPart;

public interface ArrangementService {
  Arrangement create(long trackId);
  Arrangement insertNewSongPart(long arrangementId, SongPart songPart) throws ArrangementNotFoundException;
}
