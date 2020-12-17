package online.inabsurdum.jambox.songpart;

public class SongPartCantBeMovedException extends Exception {

  public SongPartCantBeMovedException(String message) {
    super(message);
  }

  public SongPartCantBeMovedException(String message, Throwable e) {
    super(message, e);
  }
}
