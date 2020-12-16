package online.inabsurdum.jambox.songpart;

public interface SongPartService {
  SongPart create(long arrangementId, SongPartDTO songpart);

  SongPart update(SongPartDTO songPartDTO);

  void remove(long id);

  void setArrSequenceNo(long id, int arrSequenceNo);

  SongPart moveUp(long id);

  SongPart moveDown(long id);
}
