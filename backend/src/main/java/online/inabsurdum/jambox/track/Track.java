package online.inabsurdum.jambox.track;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    String duration;

    @NotNull
    Date uploadedAt;

    @NotNull
    String checksum;


    Track(TrackDTO trackDTO) {
        this.id = trackDTO.getId();
        this.title = trackDTO.getTitle();
        this.duration = trackDTO.getDuration();
        this.uploadedAt = trackDTO.getUploadedAt();
        this.checksum = trackDTO.getChecksum();
    }

}
