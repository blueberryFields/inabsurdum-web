package online.inabsurdum.jambox.songpart;

public interface SongPartService {
  SongPart create(long arrangementId, SongPartDTO songpart);
  SongPart update(SongPartDTO songPartDTO);
}
