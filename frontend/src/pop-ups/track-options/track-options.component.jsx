import React from 'react';

import DropDownMenu from '../../pop-ups/drop-down-menu/drop-down-menu.component';
import DropDownMenuItem from '../../pop-ups/drop-down-menu-item/drop-down-menu-item.component';

import './track-options.styles.scss';

const TrackOptions = ({ hide, track }) => {
  const removeTrack = () => {
    console.log('remove track:', track.title);
  };

  const downloadTrack = () => {
    console.log('download track:', track.title);
  };

  return (
    <div className="track-options">
      <DropDownMenu hide={hide}>
        <DropDownMenuItem doubletap action={removeTrack} hide={hide}>
          Ta bort spår
        </DropDownMenuItem>
        <DropDownMenuItem action={downloadTrack} hide={hide}>
          Ladda ner spår
        </DropDownMenuItem>
      </DropDownMenu>
    </div>
  );
};
export default TrackOptions;
