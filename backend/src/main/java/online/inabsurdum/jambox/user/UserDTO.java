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
public class UserDTO {

    private Long id;

    private String username;

    private String password;

    private String bandName;

    private List<PlaylistDTO> playlists;

    List<Role> roles;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.bandName = user.getBandName();
        this.playlists = convertPlaylistsToPlaylistDTOs(user.getPlaylists());
        this.roles = user.getRoles();
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
