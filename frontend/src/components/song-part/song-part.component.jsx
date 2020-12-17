import React from 'react';
import axios from 'axios';
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
import { setArrangement } from '../../redux/player/player.actions';

import './song-part.styles.scss';

const SongPart = ({ part, arrangementId, highestArrSeqNo }) => {
  const { id, title, startingAt, endingAt, lyrics, arrSequenceNo } = part;

  const dispatch = useDispatch();

  const remove = async () => {
    try {
      const response = await axios.request({
        method: 'delete',
        url: 'api/arrangement/removesongpart/' + arrangementId + '/' + id,
      });
      dispatch(setArrangement(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const moveUp = async () => {
    if (arrSequenceNo > 0) {
      try {
        const response = await axios.request({
          method: 'put',
          url: 'api/arrangement/movesongpartup/' + arrangementId + '/' + id,
        });
        dispatch(setArrangement(response.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const moveDown = async () => {
    if (arrSequenceNo < highestArrSeqNo) {
      try {
        const response = await axios.request({
          method: 'put',
          url: 'api/arrangement/movesongpartdown/' + arrangementId + '/' + id,
        });
        dispatch(setArrangement(response.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                <EditSongPartModal
                  arrangementId={arrangementId}
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
