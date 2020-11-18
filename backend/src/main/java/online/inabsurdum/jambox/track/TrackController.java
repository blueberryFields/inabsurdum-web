package online.inabsurdum.jambox.track;

import online.inabsurdum.jambox.playlist.PlaylistDTO;
import online.inabsurdum.jambox.playlist.PlaylistNotFoundException;
import online.inabsurdum.jambox.playlist.PlaylistService;
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
    private final PlaylistService playlistService;

    public TrackController(TrackService trackService, PlaylistService playlistService) {
        this.trackService = trackService;
        this.playlistService = playlistService;
    }

    @GetMapping("/findall")
    public ResponseEntity<List<TrackDTO>> findAll() {
        try {
            List<TrackDTO> result = trackService.findAll();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/load/{checksum}")
    public ResponseEntity<Resource> load(@PathVariable String checksum, HttpServletRequest request) {
        try {
            Resource track = trackService.loadFileAsResource(checksum);
            String contentType = getContentType(track, request);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + track.getFilename() + "\"")
                    .body(track);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /*@GetMapping("/download/{checksum}")
    public ResponseEntity<Resource> download(@PathVariable String checksum, HttpServletRequest request) {
        try {
            Resource track = trackService.loadFileAsResourceWithOriginalFilename(checksum);
            String contentType = getContentType(track, request);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + track.getFilename() + "\"")
                    .body(track);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }*/

    private String getContentType(Resource track, HttpServletRequest request) {
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(track.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return contentType;
    }


    @PostMapping
    public ResponseEntity<List<PlaylistDTO>> uploadTrack(@RequestParam("file") MultipartFile file, @RequestParam(name = "playlistid") long playlistId, @RequestParam(name = "title") String title, @RequestParam(name = "userid") long userId) {
        try {
            trackService.upload(title, playlistId, file);
            List<PlaylistDTO> result = playlistService.findByUserId(userId);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (PlaylistNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<List<PlaylistDTO>> rename(@PathVariable long id, @RequestParam(name = "newtitle") String newTitle, @RequestParam(name = "userid") long userId) {
        try {
            trackService.rename(id, newTitle);
            List<PlaylistDTO> result = playlistService.findByUserId(userId);
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
            trackService.delete(id);
            List<PlaylistDTO> result = playlistService.findByUserId(userId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
