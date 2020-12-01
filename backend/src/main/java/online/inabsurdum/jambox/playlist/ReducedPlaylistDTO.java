package online.inabsurdum.jambox.playlist;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.track.ReducedTrackDTO;
import online.inabsurdum.jambox.track.Track;

@Getter
@Setter
@NoArgsConstructor
public class ReducedPlaylistDTO {

  private Long id;

  private String title;

  private List<ReducedTrackDTO> tracks;

  ReducedPlaylistDTO(Playlist playlist) {
    this.id = playlist.getId();
    this.title = playlist.getTitle();
    this.tracks = convertTracksToReducedTrackDTOs(playlist.getTracks());
  }

  private List<ReducedTrackDTO> convertTracksToReducedTrackDTOs(
    List<Track> tracks
  ) {
    if (tracks != null) {
      List<ReducedTrackDTO> reducedTrackDTOs = new ArrayList<>();
      for (Track track : tracks) {
        reducedTrackDTOs.add(new ReducedTrackDTO(track));
      }
      return reducedTrackDTOs;
    } else {
      return new ArrayList<>();
    }
  }
}
