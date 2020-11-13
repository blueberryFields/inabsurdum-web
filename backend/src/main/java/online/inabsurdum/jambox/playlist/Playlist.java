package online.inabsurdum.jambox.playlist;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.track.Track;
import online.inabsurdum.jambox.track.TrackDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String title;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "playlist_id")
    private List<Track> tracks;

    public Playlist(PlaylistDTO playlistDTO) {
        this.id = playlistDTO.getId();
        this.title = playlistDTO.getTitle();
        this.tracks = convertTrackDTOsToTracks(playlistDTO.getTracks());
    }

    private List<Track> convertTrackDTOsToTracks(List<TrackDTO> trackDTOs) {
        List<Track> tracks = new ArrayList<>();
        for (TrackDTO trackDTO : trackDTOs) {
            tracks.add(new Track(trackDTO));
        }
        return tracks;
    }

}
