package online.inabsurdum.jambox.playlist;

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

    @GetMapping()
    public ResponseEntity<List<PlaylistDTO>> findAll() {
        try {
            List<PlaylistDTO> result = playlistService.findAll();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PlaylistDTO>> findByUserId(@PathVariable long userId) {
        try {
            List<PlaylistDTO> result = playlistService.findByUserId(userId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reduced/{userId}")
    public ResponseEntity<List<ReducedPlaylistDTO>> findReducedByUserId(@PathVariable long userId) {
        try {
            List<ReducedPlaylistDTO> result = playlistService.findReducedByUserId(userId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<List<PlaylistDTO>> create(@RequestParam(name = "title") String title, @RequestParam(name = "userid") long userId) {
        try {
            List<PlaylistDTO> result = playlistService.create(title, userId);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<PlaylistDTO>> rename(@PathVariable long id, @RequestParam(name = "newtitle") String newTitle, @RequestParam(name = "userid") long userId) {
        try {
            List<PlaylistDTO> result = playlistService.rename(id, newTitle, userId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<List<PlaylistDTO>> delete(@PathVariable long id, @RequestParam(name = "userid") long userId) {
        try {
            List<PlaylistDTO> result = playlistService.delete(id, userId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
