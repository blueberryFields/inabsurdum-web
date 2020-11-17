package online.inabsurdum.jambox.playlist;

import online.inabsurdum.jambox.user.User;
import online.inabsurdum.jambox.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ReducedPlaylistDTO> create(String title, long userId) {
        Playlist playlist = new Playlist();
        playlist.setTitle(title);
        playlistRepository.save(playlist);

        User user = userRepository.findById(userId);
        List<Playlist> playlists = user.getPlaylists();
        playlists.add(playlist);
        user.setPlaylists(playlists);
        userRepository.save(user);

        return convertPlaylistsToReducedPlaylistDTOs(playlists);
    }

    @Override
    public List<PlaylistDTO> findAll() {
        List<Playlist> playlists = playlistRepository.findAll();
        return convertPlayListsToPlaylistDTOs(playlists);
    }

    @Override
    public List<PlaylistDTO> findByUserId(long userId) {
        User user = userRepository.findById(userId);
        return convertPlaylistsToPlaylistDTOs(user.getPlaylists());
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

    @Override
    public List<ReducedPlaylistDTO> findReducedByUserId(long userId) {
        User user = userRepository.findById(userId);
        return convertPlaylistsToReducedPlaylistDTOs(user.getPlaylists());
    }

    private List<ReducedPlaylistDTO> convertPlaylistsToReducedPlaylistDTOs(List<Playlist> playlists) {
        if (playlists != null) {
            List<ReducedPlaylistDTO> playlistDTOs = new ArrayList<>();
            for (Playlist playlist : playlists) {
                playlistDTOs.add(new ReducedPlaylistDTO(playlist));
            }
            return playlistDTOs;
        } else {
            return null;
        }
    }



    @Override
    public PlaylistDTO rename(long id, String newTitle) {
        Playlist playlist = playlistRepository.findById(id);
        playlist.setTitle(newTitle);
        return new PlaylistDTO(playlistRepository.save(playlist));
    }

    @Override
    public void delete(long id) {
        playlistRepository.deleteById(id);
    }


    private List<PlaylistDTO> convertPlayListsToPlaylistDTOs(List<Playlist> playlists) {
        List<PlaylistDTO> playlistDTOs = new ArrayList<>();
        for (Playlist playlist : playlists) {
            playlistDTOs.add(new PlaylistDTO(playlist));
        }
        return playlistDTOs;
    }
}
