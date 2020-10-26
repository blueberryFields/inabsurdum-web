package online.inabsurdum.jambox.track;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.Playlist.Playlist;

import javax.persistence.*;
import java.util.Date;

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

    Date uploadedAt;

    @NotNull
    private String url;

    Track(TrackDTO trackDTO) {
        this.id = trackDTO.getId();
        this.title = trackDTO.getTitle();
        this.duration = trackDTO.getDuration();
        this.uploadedAt = trackDTO.getUploadedAt();
        this.url = trackDTO.getUrl();
    }

}
