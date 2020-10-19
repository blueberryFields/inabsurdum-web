package online.inabsurdum.jambox.Playlist;

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

    @OneToMany
    @JoinColumn(name = "playlist_id", nullable = false)
    private List<Track> tracks;


}
