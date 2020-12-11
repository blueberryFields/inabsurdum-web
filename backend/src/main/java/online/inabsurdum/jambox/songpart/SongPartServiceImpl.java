package online.inabsurdum.jambox.songpart;

import org.springframework.stereotype.Service;

@Service
public class SongPartServiceImpl implements SongPartService {

  private final SongPartRepository songPartRepository;

  public SongPartServiceImpl(SongPartRepository songPartRepository) {
    this.songPartRepository = songPartRepository;
  }

  @Override
  public SongPart createSongPart(long arrangementId, SongPartDTO songPartDTO) {
    SongPart songPart = new SongPart(songPartDTO);
    songPart.setArrSequenceNo(
      songPartRepository.findMaxArrSequensNo(arrangementId) + 1
    );
    return songPartRepository.save(songPart);
  }
}
