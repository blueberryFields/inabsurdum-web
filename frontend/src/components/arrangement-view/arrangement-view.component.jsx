import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  selectArrangement,
  selectCurrentSongPart,
  selectSelectedTrack,
  selectArrangementClipBoard,
} from '../../redux/player/player.selectors';
import {
  setArrangementClipBoard,
  setArrangement,
} from '../../redux/player/player.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import SongPart from '../song-part/song-part.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import CreateSongPartModal from '../create-song-part-modal/create-song-part-modal.component';
import ConfirmModal from '../confirm-modal/confirm-modal.component';

import './arrangement-view.styles.scss';

const ArrangementView = () => {
  const arrangement = useSelector(selectArrangement);
  const { title } = useSelector(selectSelectedTrack);
  const arrangementClipBoard = useSelector(selectArrangementClipBoard);
  const currentSongPart = useSelector(selectCurrentSongPart);

  const dispatch = useDispatch();

  const pasteArrangement = async () => {
    try {
      const response = await axios.request({
        method: 'get',
        url:
          'api/arrangement/paste/' +
          arrangementClipBoard +
          '/' +
          arrangement.id,
      });
      dispatch(setArrangement(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="arrangement-view">
      <h3 className="arrangement-header">
        <div className="title">{title}</div>
      </h3>
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
      <div className="footer">
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
        <div className="copy-paste">
          <div
            className={`${
              arrangementClipBoard === arrangement.id ? '' : 'clickable'
            }`}
            onClick={() => {
              arrangementClipBoard !== arrangement.id &&
                dispatch(setArrangementClipBoard(arrangement.id));
            }}
          >
            {arrangementClipBoard === arrangement.id ? 'kopierad' : 'kopiera'}
          </div>
          <ToggleContent
            toggle={(show) => (
              <div onClick={show} className="clickable">
                klistra in
              </div>
            )}
            content={(hide) => (
              <ModalFrame hide={hide}>
                <ConfirmModal action={pasteArrangement} hide={hide} />
              </ModalFrame>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ArrangementView;
