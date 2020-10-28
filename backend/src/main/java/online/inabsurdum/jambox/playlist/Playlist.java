package online.inabsurdum.jambox.playlist;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.track.Track;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String title;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "playlist_id")
    private List<Track> tracks;

    public Playlist(PlaylistDTO playlistDTO) {
        this.id = playlistDTO.getId();
        this.title = playlistDTO.getTitle();
        this.tracks = playlistDTO.getTracks();
    }

}
