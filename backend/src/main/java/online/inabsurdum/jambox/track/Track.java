package online.inabsurdum.jambox.track;

import com.sun.istack.NotNull;
import java.util.Date;
import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.arrangement.Arrangement;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Track {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id;

  @NotNull
  String title;

  @NotNull
  String duration;

  @NotNull
  Date uploadedAt;

  @NotNull
  String checksum;

  @NotNull
  String originalFilename;

  @NotNull
  @Column(columnDefinition = "JSON")
  String peaks;
  
  @NotNull
  @OneToOne
  @JoinColumn(name = "arrangement_id")
  Arrangement arrangement;

  public Track(TrackDTO trackDTO) {
    this.id = trackDTO.getId();
    this.title = trackDTO.getTitle();
    this.duration = trackDTO.getDuration();
    this.uploadedAt = trackDTO.getUploadedAt();
    this.checksum = trackDTO.getChecksum();
    this.originalFilename = trackDTO.getOriginalFilename();
    this.peaks = trackDTO.getPeaks().toString();
    this.arrangement = new Arrangement(trackDTO.getArrangement());
  }
}
