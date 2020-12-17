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

  @PostMapping("/createsongpart/{arrangementid}")
  public ResponseEntity<Arrangement> createSongPart(
    @PathVariable(name = "arrangementid") long arrangementId,
    @RequestBody SongPartDTO songPartDTO
  ) {
    try {
      SongPart songPart = songPartService.create(arrangementId, songPartDTO);
      Arrangement arrangement = arrangementService.insertNewSongPart(
        arrangementId,
        songPart
      );

      return new ResponseEntity<>(arrangement, HttpStatus.CREATED);
    } catch (Exception e) {
      System.out.println(e);
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage()
      );
    }
  }

  @CrossOrigin
  @PutMapping("/updatesongpart/{arrangementid}")
  public ResponseEntity<Arrangement> updateSongPart(
    @PathVariable(name = "arrangementid") long arrangementId,
    @RequestBody SongPartDTO songPartDTO
  ) {
    try {
      songPartService.update(songPartDTO);
      Arrangement arrangement = arrangementService.findById(arrangementId);

      return new ResponseEntity<>(arrangement, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage()
      );
    }
  }

  @CrossOrigin
  @DeleteMapping("/removesongpart/{arrangementid}/{songpartid}")
  public ResponseEntity<Arrangement> removeSongPart(
    @PathVariable(name = "arrangementid") long arrangementId,
    @PathVariable(name = "songpartid") long songPartId
  ) {
    try {
      songPartService.remove(songPartId);

      arrangementService.reorderArrSequence(arrangementId);

      Arrangement arrangement = arrangementService.findById(arrangementId);

      return new ResponseEntity<>(arrangement, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage()
      );
    }
  }

  @CrossOrigin
  @PutMapping("/movesongpartup/{arrangementid}/{songpartid}")
  public ResponseEntity<Arrangement> moveUp(
    @PathVariable(name = "arrangementid") long arrangementId,
    @PathVariable(name = "songpartid") long songPartId
  ) {
    try {
      arrangementService.moveSongPartUp(songPartId, arrangementId);

      Arrangement arrangement = arrangementService.findById(arrangementId);

      return new ResponseEntity<>(arrangement, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage()
      );
    }
  }

  @CrossOrigin
  @PutMapping("/movesongpartdown/{arrangementid}/{songpartid}")
  public ResponseEntity<Arrangement> moveDown(
    @PathVariable(name = "arrangementid") long arrangementId,
    @PathVariable(name = "songpartid") long songPartId
  ) {
    try {
      arrangementService.moveSongPartDown(songPartId, arrangementId);

      Arrangement arrangement = arrangementService.findById(arrangementId);

      return new ResponseEntity<>(arrangement, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.getMessage()
      );
    }
  }
}
