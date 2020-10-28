package online.inabsurdum.jambox.track;

public class PeakNormalizationException extends Exception {
    PeakNormalizationException(String message) {
        super(message);
    }

    PeakNormalizationException(String message, Throwable e) {
        super(message, e);
    }
}
