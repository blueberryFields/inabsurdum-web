package online.inabsurdum.jambox.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.playlist.Playlist;
import online.inabsurdum.jambox.playlist.PlaylistDTO;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
class ReducedUserDTO {

    private Long id;

    private String username;

    private String bandName;

    private String jwt;

    private List<PlaylistDTO> playlists;


    ReducedUserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.bandName = user.getBandName();
        this.playlists = convertPlaylistsToPlaylistDTOs(user.getPlaylists());
    }

    private List<PlaylistDTO> convertPlaylistsToPlaylistDTOs(List<Playlist> playlists) {
        if (playlists != null) {
            List<PlaylistDTO> playlistDTOs = new ArrayList<>();
            for (Playlist playlist : playlists) {
                playlistDTOs.add(new PlaylistDTO(playlist));
            }
            return playlistDTOs;
        } else {
            return null;
        }
    }

}
