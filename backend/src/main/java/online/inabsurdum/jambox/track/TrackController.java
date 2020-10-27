package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.Playlist.PlaylistNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("track")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping("/findall")
    public ResponseEntity<List<TrackDTO>> findAll() {
        try {
            List<TrackDTO> result = trackService.findAll();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PostMapping
    public ResponseEntity<TrackDTO> uploadTrack(@RequestParam("file") MultipartFile file, @RequestParam(name = "playlistid") long playlistId, @RequestParam(name = "title") String title) {
        try {
            TrackDTO result = trackService.create(title, playlistId, file);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (PlaylistNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<TrackDTO> rename(@RequestParam(name = "id") long id, @RequestParam(name = "newtitle") java.lang.String newTitle) {
        try {
            TrackDTO result = trackService.rename(id, newTitle);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(name = "id") long id) {
        try {
            trackService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


}
