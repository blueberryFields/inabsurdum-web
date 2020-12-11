package online.inabsurdum.jambox.songpart;

public interface SongPartService {
  SongPart createSongPart(long arrangementId, SongPartDTO songpart);
}
