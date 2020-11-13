package online.inabsurdum.jambox.playlist;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.track.Track;
import online.inabsurdum.jambox.track.TrackDTO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistDTO {

    private Long id;

    private String title;

    private List<TrackDTO> tracks;

    PlaylistDTO(Playlist playlist) {
        this.id = playlist.getId();
        this.title = playlist.getTitle();
        this.tracks = convertTracksToTrackDTOs(playlist.getTracks());
    }

    private List<TrackDTO> convertTracksToTrackDTOs(List<Track> tracks) {
        List<TrackDTO> trackDTOs = new ArrayList<>();
        for (Track track : tracks) {
            trackDTOs.add(new TrackDTO(track));
        }
        return trackDTOs;
    }

}
