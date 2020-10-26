package online.inabsurdum.jambox.Playlist;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    @Override
    public PlaylistDTO create(String title) {
        Playlist playlist = new Playlist();
        playlist.setTitle(title);
        return new PlaylistDTO(playlistRepository.save(playlist));
    }

    @Override
    public List<PlaylistDTO> findAll() {
        List<Playlist> playlists = playlistRepository.findAll();
        return convertPlayListsToPlaylistDTOs(playlists);
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
