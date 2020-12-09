import React from 'react';

import SongPart from '../song-part/song-part.component';
import CustomButton from '../custom-button/custom-button.component';

import './arrangement-view.styles.scss';

const arrangement = {
  id: 0,
  title: 'Åkerspöke',
  parts: [
    {
      id: 0,
      title: 'Intro X4',
      startingAt: '00:00',
      endingAt: '01:03',
      lyrics: '',
    },
    {
      id: 1,
      title: 'Break',
      startingAt: '01:04',
      endingAt: '01:17',
      lyrics: '',
    },
    {
      id: 2,
      title: 'Vers 1 X8',
      startingAt: '01:18',
      endingAt: '02:14',
      lyrics:
        'Ett landskap färgat av brunt och grått \nett disigt töcken är allt som förmått \natt tränga genom en dimma så tjock \nmen där nånstans bland sten och stock \n\nEn suddig skepnad svävar över ett fält \nen sorgsen själ under en rot som har vält \nett flackande ljus på en veke så skör \när det så här det är när man dör?',
    },
    {
      id: 3,
      title: 'Break',
      startingAt: '02:14',
      endingAt: '02:17',
      lyrics: '',
    },
    {
      id: 4,
      title: 'Refräng',
      startingAt: '02:18',
      endingAt: '02:56',
      lyrics:
        'ÅKERSPÖKE \nEn sista plats utan rast, utan ro \nÅKERSPÖKE \nIngenstans har denna själ att bo \nÅKERSPÖKE \nJag vet inte vad jag ska tro \nEn vemodig figur som liknar ingenting jag tidigare sett!',
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
      <div className="buttons">
        <CustomButton type="submit" inverted>
          Redigera
        </CustomButton>
      </div>
    </div>
  );
};

export default ArrangementView;
