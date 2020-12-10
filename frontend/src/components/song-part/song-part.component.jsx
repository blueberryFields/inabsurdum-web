import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import EditSongPartModal from '../edit-song-part-modal/edit-song-part-modal.component';

import './song-part.styles.scss';

const SongPart = ({ part }) => {
  const { title, startingAt, endingAt, lyrics } = part;

  return (
    <div className="song-part">
      <div className="part-header">
        <h4 className="title">{title}</h4>
        <div className="time-indication">
          {startingAt} - {endingAt}
        </div>
        <div className="edit-buttons">
          <ToggleContent
            toggle={(show) => (
              <FontAwesomeIcon className="icon" icon={faEdit} onClick={show} />
            )}
            content={(hide) => (
              <ModalFrame hide={hide} header={'Redigera låt-del'}>
                <EditSongPartModal part={part} hide={hide} />
              </ModalFrame>
            )}
          />

          <FontAwesomeIcon className="icon caret" icon={faCaretUp} />
          <FontAwesomeIcon className="icon caret" icon={faCaretDown} />
        </div>
      </div>
      <p className="lyrics">{lyrics}</p>
    </div>
  );
};

export default SongPart;
