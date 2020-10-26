package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.Playlist.PlaylistNotFoundException;

import java.util.List;

public interface TrackService {

    TrackDTO create(TrackDTO trackDTO, long playlistId) throws PlaylistNotFoundException;

    List<TrackDTO> findAll();

    TrackDTO rename(long id, String newTitle);

    void delete(long id);
}
