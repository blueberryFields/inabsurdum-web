import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import SongPart from '../song-part/song-part.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import CreateSongPartModal from '../create-song-part-modal/create-song-part-modal.component';

import './arrangement-view.styles.scss';

const arrangement = {
  id: 0,
  title: 'Åkerspöke',
  parts: [
    {
      id: 0,
      title: 'Intro X4',
      startingAt: '00:00:00',
      endingAt: '00:01:03',
      lyrics: '',
    },
    {
      id: 1,
      title: 'Break',
      startingAt: '00:01:04',
      endingAt: '00:01:17',
      lyrics: '',
    },
    {
      id: 2,
      title: 'Vers 1 X8',
      startingAt: '00:01:18',
      endingAt: '00:02:14',
      lyrics:
        'Ett landskap färgat av brunt och grått \nett disigt töcken är allt som förmått \natt tränga genom en dimma så tjock \nmen där nånstans bland sten och stock \n\nEn suddig skepnad svävar över ett fält \nen sorgsen själ under en rot som har vält \nett flackande ljus på en veke så skör \när det så här det är när man dör?',
    },
    {
      id: 3,
      title: 'Break',
      startingAt: '00:02:14',
      endingAt: '00:02:17',
      lyrics: '',
    },
    {
      id: 4,
      title: 'Refräng',
      startingAt: '00:02:18',
      endingAt: '00:02:56',
      lyrics:
        'ÅKERSPÖKE \nEn sista plats utan rast, utan ro \nÅKERSPÖKE \nIngenstans har denna själ att bo \nÅKERSPÖKE \nJag vet inte vad jag ska tro \nEn vemodig figur som liknar ingenting jag tidigare sett!',
    },
    {
      id: 5,
      title: 'Vers 1 X8',
      startingAt: '00:01:18',
      endingAt: '00:02:14',
      lyrics:
        'Ett landskap färgat av brunt och grått \nett disigt töcken är allt som förmått \natt tränga genom en dimma så tjock \nmen där nånstans bland sten och stock \n\nEn suddig skepnad svävar över ett fält \nen sorgsen själ under en rot som har vält \nett flackande ljus på en veke så skör \när det så här det är när man dör?',
    },
  ],
};

const ArrangementView = () => {
  return (
    <div className="arrangement-view">
      <h3 className="arrangement-header">{arrangement.title}</h3>
      {arrangement.parts.map((part, idx) => (
        <SongPart key={idx} part={part} />
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
            <CreateSongPartModal hide={hide} />
          </ModalFrame>
        )}
      />
    </div>
  );
};

export default ArrangementView;
