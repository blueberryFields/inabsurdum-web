package online.inabsurdum.jambox.arrangement;

public class ArrangementNotFoundException extends Exception {
  
  ArrangementNotFoundException(String message) {
    super(message);
  }

  ArrangementNotFoundException(String message, Throwable e) {
    super(message, e);
  }
}
