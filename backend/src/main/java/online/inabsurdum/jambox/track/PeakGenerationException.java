package online.inabsurdum.jambox.track;

public class PeakGenerationException extends Exception {
    PeakGenerationException(String message) {
        super(message);
    }

    PeakGenerationException(String message, Throwable e) {
        super(message, e);
    }
}
