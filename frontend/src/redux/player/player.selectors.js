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

export const selectPeaksFromSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack.peaks
);

export const selectArrangmentFromSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack.arrangement
);

export const selectArrangementClipBoard = createSelector(
  [selectPlayer],
  (player) => player.arrangementClipBoard
);

export const selectChecksumFromSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack.checksum
);

export const selectPlayingFromSelectedTrack = createSelector(
  [selectPlayer],
  (player) => player.selectedTrack.playing
);

export const selectArrangement = createSelector(
  [selectSelectedTrack],
  (selectedTrack) => selectedTrack.arrangement
);

export const selectCurrentSongPart = createSelector(
  [selectPlayer],
  (player) => player.currentSongPart
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
