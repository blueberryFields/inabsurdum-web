package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.playlist.PlaylistNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/track")
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

    @GetMapping("/load")
    public ResponseEntity<Resource> load(@RequestParam(name = "checksum") String checksum, HttpServletRequest request) {
        try {
            Resource track = trackService.loadFileAsResource(checksum);

            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(track.getFile().getAbsolutePath());
            } catch (IOException ex) {
                System.out.println("Could not determine file type.");
            }

            // Fallback to the default content type if type could not be determined
            if(contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("audio/wav"/*contentType*/))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + track.getFilename() + "\"")
                    .body(track);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<TrackDTO> uploadTrack(@RequestParam("file") MultipartFile file, @RequestParam(name = "playlistid") long playlistId, @RequestParam(name = "title") String title) {
        try {
            TrackDTO result = trackService.upload(title, playlistId, file);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (PlaylistNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrackDTO> rename(@PathVariable long id, @RequestParam(name = "newtitle") String newTitle) {
        try {
            TrackDTO result = trackService.rename(id, newTitle);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        try {
            trackService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


}
