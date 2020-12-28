import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectArrangement,
  selectCurrentSongPart,
  selectSelectedTrack,
} from '../../redux/player/player.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import SongPart from '../song-part/song-part.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import CreateSongPartModal from '../create-song-part-modal/create-song-part-modal.component';

import './arrangement-view.styles.scss';

const ArrangementView = () => {
  const arrangement = useSelector(selectArrangement);
  const { title } = useSelector(selectSelectedTrack);

  const currentSongPart = useSelector(selectCurrentSongPart);

  return (
    <div className="arrangement-view">
      <h3 className="arrangement-header">{title}</h3>
      {arrangement.songParts.map((part, idx) => (
        <SongPart
          key={idx}
          part={part}
          arrangementId={arrangement.id}
          isPlaying={part.arrSequenceNo === currentSongPart}
          highestArrSeqNo={Math.max.apply(
            Math,
            arrangement.songParts.map((o) => {
              return o.arrSequenceNo;
            })
          )}
        />
      ))}
      <ToggleContent
        toggle={(show) => (
          <FontAwesomeIcon
            className="add-part-icon"
            icon={faPlusCircle}
            onClick={show}
          />
        )}
        content={(hide) => (
          <ModalFrame hide={hide} header={'Skapa låt-del'}>
            <CreateSongPartModal id={arrangement.id} hide={hide} />
          </ModalFrame>
        )}
      />
    </div>
  );
};

export default ArrangementView;
