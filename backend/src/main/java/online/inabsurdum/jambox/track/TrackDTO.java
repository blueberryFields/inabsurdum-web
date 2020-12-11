package online.inabsurdum.jambox.track;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.arrangement.ArrangementDTO;

@Getter
@Setter
@NoArgsConstructor
public class TrackDTO {

  private Long id;

  String title;

  String duration;

  Date uploadedAt;

  String checksum;

  String originalFilename;

  Map peaks;

  ArrangementDTO arrangement;

  public TrackDTO(Track track) {
    this.id = track.getId();
    this.title = track.getTitle();
    this.duration = track.getDuration();
    this.uploadedAt = track.getUploadedAt();
    this.checksum = track.getChecksum();
    this.originalFilename = track.getOriginalFilename();
    // Convert string to map so it can be correctly serialized to JSON by Jackson
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      this.peaks = objectMapper.readValue(track.getPeaks(), Map.class);
    } catch (Exception e) {
      e.printStackTrace();
    }
    this.arrangement = new ArrangementDTO(track.getArrangement());
  }
}
