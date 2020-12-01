package online.inabsurdum.jambox.track;

public class TrackNotFoundException extends Exception {

  TrackNotFoundException(String message) {
    super(message);
  }

  TrackNotFoundException(String message, Throwable e) {
    super(message, e);
  }
}
