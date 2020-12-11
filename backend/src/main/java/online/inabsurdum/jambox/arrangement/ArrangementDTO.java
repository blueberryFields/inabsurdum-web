package online.inabsurdum.jambox.arrangement;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartDTO;

@Getter
@Setter
@NoArgsConstructor
public class ArrangementDTO {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id;

  private List<SongPartDTO> songParts;

  public ArrangementDTO(Arrangement arrangement) {
    this.id = arrangement.getId();
    this.songParts = convertSongPartsToSongPartDTOs(arrangement.getSongParts());
  }

  private List<SongPartDTO> convertSongPartsToSongPartDTOs(
    List<SongPart> songParts
  ) {
    if (songParts != null) {
      List<SongPartDTO> songPartDTOs = new ArrayList<>();
      for (SongPart songPart : songParts) {
        songPartDTOs.add(new SongPartDTO(songPart));
      }
      return songPartDTOs;
    } else {
      return new ArrayList<>();
    }
  }
}
