import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectPlayer = (state) => state.player;

export const selectPlaylists = createSelector(
  [selectPlayer],
  (player) => player.playlists
);

export const selectSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack
);

export const selectIsTrackSelected = memoize((track) =>
  createSelector([selectSelectedTrack], (selectedTrack) => ({
    selected: selectedTrack.id === track.id,
    playing: selectedTrack.id === track.id && selectedTrack.playing,
  }))
);

export const selectShowControls = createSelector(
  [selectPlayer],
  (player) => player.showControls
);

