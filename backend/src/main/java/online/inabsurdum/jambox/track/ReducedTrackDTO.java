package online.inabsurdum.jambox.track;

import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReducedTrackDTO {

  private Long id;

  String title;

  String duration;

  Date uploadedAt;

  public ReducedTrackDTO(Track track) {
    this.id = track.getId();
    this.title = track.getTitle();
    this.duration = track.getDuration();
    this.uploadedAt = track.getUploadedAt();
  }
}
