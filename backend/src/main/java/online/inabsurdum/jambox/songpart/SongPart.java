package online.inabsurdum.jambox.songpart;

import com.sun.istack.NotNull;
import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class SongPart {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id;

  @NotNull
  int arrSequenceNo;

  String title;

  String startingAt;

  String endingAt;

  @Column(length=4096)
  String lyrics;

  public SongPart(SongPartDTO songPartDTO) {
    this.id = songPartDTO.getId();
    this.arrSequenceNo = songPartDTO.getArrSequenceNo();
    this.title = songPartDTO.getTitle();
    this.startingAt = songPartDTO.getStartingAt();
    this.endingAt = songPartDTO.getEndingAt();
    this.lyrics = songPartDTO.getLyrics();
  }
}
