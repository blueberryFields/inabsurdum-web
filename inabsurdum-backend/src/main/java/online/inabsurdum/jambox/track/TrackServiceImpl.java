package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.Playlist.Playlist;
import online.inabsurdum.jambox.Playlist.PlaylistNotFoundException;
import online.inabsurdum.jambox.Playlist.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;

    public TrackServiceImpl(TrackRepository trackRepository, PlaylistRepository playlistRepository) {
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
    }

    @Override
    public TrackDTO create(TrackDTO trackDTO, long playlistId) throws PlaylistNotFoundException {
        Track track = trackRepository.save(new Track(trackDTO));

        Playlist playlist = playlistRepository.findById(playlistId);
        if (playlist == null) throw new PlaylistNotFoundException();
        List<Track> tracks = playlist.getTracks();
        tracks.add(track);
        playlist.setTracks(tracks);
        playlistRepository.save(playlist);

        return new TrackDTO(track);
    }

    @Override
    public List<TrackDTO> findAll() {
        List<Track> tracks = trackRepository.findAll();
        return convertTracksToTrackDTOs(tracks);
    }

    @Override
    public TrackDTO rename(long id, String newTitle) {
        Track track = trackRepository.findById(id);
        track.setTitle(newTitle);
        return new TrackDTO(trackRepository.save(track));
    }

    @Override
    public void delete(long id) {
        trackRepository.deleteById(id);
    }

    private List<TrackDTO> convertTracksToTrackDTOs(List<Track> tracks) {
        List<TrackDTO> trackDTOs = new ArrayList<>();
        for (Track track : tracks) {
            trackDTOs.add(new TrackDTO(track));
        }
        return trackDTOs;
    }
}
