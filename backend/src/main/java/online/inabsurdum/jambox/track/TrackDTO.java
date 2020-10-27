package online.inabsurdum.jambox.track;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.Playlist.Playlist;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class TrackDTO {

    private Long id;

    String title;

    String duration;

    Date uploadedAt;

    String checksum;

    @JsonIgnore
    private Playlist playlist;

    TrackDTO(Track track) {
        this.id = track.getId();
        this.title = track.getTitle();
        this.duration = track.getDuration();
        this.uploadedAt = track.getUploadedAt();
        this.checksum = track.getChecksum();
    }
}
