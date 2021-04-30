import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faEdit,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import EditSongPartModal from '../edit-song-part-modal/edit-song-part-modal.component';
import ConfirmModal from '../confirm-modal/confirm-modal.component';
import {
  moveSongPartUpStart,
  removeSongPartStart,
  moveSongPartDownStart,
} from '../../redux/tracks/tracks.actions';

import './song-part.styles.scss';

const SongPart = ({ part, arrangementId, highestArrSeqNo, isPlaying }) => {
  const {
    id: songpartId,
    title,
    startingAt,
    endingAt,
    lyrics,
    arrSequenceNo,
  } = part;

  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeSongPartStart({ songpartId, arrangementId }));
  };

  const moveUp = () => {
    if (arrSequenceNo > 0) {
      dispatch(moveSongPartUpStart({ songpartId, arrangementId }));
    }
  };

  const moveDown = () => {
    if (arrSequenceNo < highestArrSeqNo) {
      dispatch(moveSongPartDownStart({ songpartId, arrangementId }));
    }
  };

  return (
    <div className={`song-part ${isPlaying ? ' is-playing' : ''}`}>
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
                <EditSongPartModal
                  arrId={arrangementId}
                  part={part}
                  hide={hide}
                />
              </ModalFrame>
            )}
          />
          <ToggleContent
            toggle={(show) => (
              <FontAwesomeIcon
                className="icon"
                icon={faTimesCircle}
                onClick={show}
              />
            )}
            content={(hide) => (
              <ModalFrame hide={hide}>
                <ConfirmModal action={remove} hide={hide} />
              </ModalFrame>
            )}
          />

          <FontAwesomeIcon
            className="icon caret"
            icon={faCaretUp}
            onClick={moveUp}
          />
          <FontAwesomeIcon
            className="icon caret"
            icon={faCaretDown}
            onClick={moveDown}
          />
        </div>
      </div>
      <p className="lyrics">{lyrics}</p>
    </div>
  );
};

export default SongPart;
