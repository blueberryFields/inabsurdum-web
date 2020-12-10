import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { getNextTrack, getPreviousTrack } from './player.utils';

const selectPlayer = (state) => state.player;

export const selectPlaylists = createSelector(
  [selectPlayer],
  (player) => player.playlists
);

export const selectPlaylistContainingTrack = memoize((trackId) =>
  createSelector([selectPlayer], (player) => {
    const playlist = player.playlists.filter((playlist) =>
      playlist.tracks.some((track) => track.id === trackId)
    );
    return playlist[0];
  })
);

export const selectSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack
);

export const selectNextTrack = createSelector([selectPlayer], (player) =>
  getNextTrack(player.playlists, player.selectedTrack)
);

export const selectPreviousTrack = createSelector([selectPlayer], (player) =>
  getPreviousTrack(player.playlists, player.selectedTrack)
);

export const selectIsTrackSelected = memoize((track) =>
  createSelector([selectSelectedTrack], (selectedTrack) => ({
    selected: selectedTrack.id === track.id,
    playing: selectedTrack.id === track.id && selectedTrack.playing,
  }))
);

export const selectShowArrangementView = createSelector(
  [selectPlayer],
  (player) => player.showArrangementView
);
