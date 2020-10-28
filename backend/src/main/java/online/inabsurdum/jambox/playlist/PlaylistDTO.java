package online.inabsurdum.jambox.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.track.Track;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistDTO {

    private Long id;

    private String title;

    private List<Track> tracks;

    PlaylistDTO(Playlist playlist) {
        this.id = playlist.getId();
        this.title = playlist.getTitle();
        this.tracks = playlist.getTracks();
    }
}
