package online.inabsurdum.jambox.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReducedPlaylistDTO {
    private Long id;

    private String title;

    ReducedPlaylistDTO(Playlist playlist) {
        this.id = playlist.getId();
        this.title = playlist.getTitle();
    }

}
