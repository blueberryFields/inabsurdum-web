package online.inabsurdum.jambox.Playlist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("/findall")
    public ResponseEntity<List<PlaylistDTO>> findAll() {
        try {
            List<PlaylistDTO> result = playlistService.findAll();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PostMapping
    public ResponseEntity<PlaylistDTO> create(@RequestParam(name = "title") String title) {
        try {
            PlaylistDTO result = playlistService.create(title);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<PlaylistDTO> rename(@RequestParam(name = "id") long id, @RequestParam(name = "newtitle") String newTitle) {
        try {
            PlaylistDTO result = playlistService.rename(id, newTitle);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(name = "id") long id) {
        try {
            playlistService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
