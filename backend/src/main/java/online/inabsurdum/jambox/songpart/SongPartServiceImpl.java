package online.inabsurdum.jambox.songpart;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SongPartServiceImpl implements SongPartService {

  private final SongPartRepository songPartRepository;

  public SongPartServiceImpl(SongPartRepository songPartRepository) {
    this.songPartRepository = songPartRepository;
  }

  @Override
  public SongPart create(long arrangementId, SongPartDTO songPartDTO) {
    SongPart songPart = new SongPart(songPartDTO);
    int arrSequenceNo = 0;
    try {
      arrSequenceNo = songPartRepository.findMaxArrSequensNo(arrangementId) + 1;
    } catch (Exception e) {
      System.out.println(e);
    }
    songPart.setArrSequenceNo(arrSequenceNo);
    return songPartRepository.save(songPart);
  }

  @Override
  public SongPart update(SongPartDTO songPartDTO) {
    Optional<SongPart> optional = songPartRepository.findById(
      songPartDTO.getId()
    );
    SongPart songPart = optional.get();
    songPart.setTitle(songPartDTO.getTitle());
    songPart.setStartingAt(songPartDTO.getStartingAt());
    songPart.setEndingAt(songPartDTO.getEndingAt());
    songPart.setLyrics(songPartDTO.getLyrics());
    return songPartRepository.save(songPart);
  }
}
