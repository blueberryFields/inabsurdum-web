package online.inabsurdum.jambox.arrangement;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.ArrayList;

import online.inabsurdum.jambox.songpart.SongPart;
import online.inabsurdum.jambox.songpart.SongPartDTO;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Arrangement {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id;

  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name = "arrangement_id")
  @OrderBy("arr_sequence_no ASC")
  private List<SongPart> songParts;

  public Arrangement(ArrangementDTO arrangementDTO) {
    this.id = arrangementDTO.getId();
    this.songParts = convertSongPartDTOsToSongParts(arrangementDTO.getSongParts());
  }

  private List<SongPart> convertSongPartDTOsToSongParts(List<SongPartDTO> songPartDTOs) {
    List<SongPart> songParts = new ArrayList<>();
    for (SongPartDTO songPartDTO : songPartDTOs) {
        songParts.add(new SongPart(songPartDTO));
    }
    return songParts;
}
}
