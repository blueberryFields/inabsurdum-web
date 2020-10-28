package online.inabsurdum.jambox.track;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.playlist.Playlist;
import org.json.JSONObject;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
class TrackDTO {

    private Long id;

    String title;

    String duration;

    Date uploadedAt;

    String checksum;

    Map peaks;

    @JsonIgnore
    private Playlist playlist;

    TrackDTO(Track track) {
        this.id = track.getId();
        this.title = track.getTitle();
        this.duration = track.getDuration();
        this.uploadedAt = track.getUploadedAt();
        this.checksum = track.getChecksum();
        // Convert string to map so it can be correctly serialized to JSON by Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.peaks = objectMapper.readValue(track.getPeaks(), Map.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
