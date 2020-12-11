package online.inabsurdum.jambox.arrangement;

import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartDTO;
import online.inabsurdum.jambox.songpart.SongPartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/arrangement")
public class ArrangmentController {

  private final ArrangementService arrangementService;
  private final SongPartService songPartService;

  public ArrangmentController(
    ArrangementService arrangementService,
    SongPartService songPartService
  ) {
    this.arrangementService = arrangementService;
    this.songPartService = songPartService;
  }

  @PostMapping("/createsongpart/{id}")
  public ResponseEntity<Arrangement> createSongPart(
    @PathVariable(name = "id") long arrangementId,
    @RequestBody SongPartDTO songpartDTO
  ) {
    try {
      SongPart songPart = songPartService.createSongPart(
        arrangementId,
        songpartDTO
      );
      Arrangement arrangement = arrangementService.insertNewSongPart(
        arrangementId,
        songPart
      );

      return new ResponseEntity<>(arrangement, HttpStatus.CREATED);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
