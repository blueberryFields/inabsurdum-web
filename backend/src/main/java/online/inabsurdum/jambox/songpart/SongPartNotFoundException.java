package online.inabsurdum.jambox.songpart;

public class SongPartNotFoundException extends Exception {

  public SongPartNotFoundException(String message) {
    super(message);
  }

  public SongPartNotFoundException(String message, Throwable e) {
    super(message, e);
  }
}
