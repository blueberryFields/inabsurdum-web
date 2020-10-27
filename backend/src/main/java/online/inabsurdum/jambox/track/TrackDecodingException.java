package online.inabsurdum.jambox.track;

public class TrackDecodingException extends Exception {

    TrackDecodingException(String message) {
        super(message);
    }

    TrackDecodingException(String message, Throwable e) {
        super(message, e);
    }
}
