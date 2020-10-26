package online.inabsurdum.jambox.Playlist;

public class PlaylistNotFoundException extends Exception {

    public PlaylistNotFoundException() {
        super("Playlist was not found");
    }

    public PlaylistNotFoundException(String missingPlaylist) {
        super("Category was not found: " + missingPlaylist);
    }
}