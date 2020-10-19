package online.inabsurdum.jambox.track;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.Playlist.Playlist;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    double duration;

    @NotNull
    private String url;

}
