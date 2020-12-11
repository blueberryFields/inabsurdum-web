package online.inabsurdum.jambox.songpart;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SongPartDTO {

  Long id;

  int arrSequenceNo;

  String title;

  String startingAt;

  String endingAt;

  String lyrics;

  public SongPartDTO(SongPart songPart) {
    this.id = songPart.getId();
    this.arrSequenceNo = songPart.getArrSequenceNo();
    this.title = songPart.getTitle();
    this.startingAt = songPart.getStartingAt();
    this.endingAt = songPart.getEndingAt();
    this.lyrics = songPart.getLyrics();
  }
}
