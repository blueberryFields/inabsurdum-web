import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { getNextTrack, getPreviousTrack } from './tracks.utils';

const selectTracks = (state) => state.tracks;

export const selectMessage = createSelector(
  [selectTracks],
  (tracks) => tracks.message
);

export const selectError = createSelector(
  [selectTracks],
  (tracks) => tracks.message
);

export const selectPlaylists = createSelector(
  [selectTracks],
  (tracks) => tracks.playlists
);

export const selectIsLoading = createSelector(
  [selectTracks],
  (tracks) => tracks.isLoading
);

export const selectFetchStatus = createSelector(
  [selectTracks],
  (tracks) => tracks.fetchStatus
);

export const selectUploadProgress = createSelector(
  [selectTracks],
  (tracks) => tracks.uploadProgress
);

export const selectPlaylistsIsLoaded = createSelector(
  [selectTracks],
  (tracks) => !!tracks.playlists
);

export const selectPlaylistContainingTrack = memoize((trackId) =>
  createSelector([selectTracks], (tracks) => {
    const playlist = tracks.playlists.filter((playlist) =>
      playlist.tracks.some((track) => track.id === trackId)
    );
    return playlist[0];
  })
);

export const selectSelectedTrack = createSelector(
  [selectTracks],
  (tracks) => tracks.selectedTrack
);

export const selectPeaksFromSelectedTrack = createSelector(
  [selectTracks],
  (tracks) => tracks.selectedTrack.peaks
);

export const selectArrangmentFromSelectedTrack = createSelector(
  [selectTracks],
  (tracks) => tracks.selectedTrack.arrangement
);

export const selectArrangementClipBoard = createSelector(
  [selectTracks],
  (tracks) => tracks.arrangementClipBoard
);

export const selectChecksumFromSelectedTrack = createSelector(
  [selectTracks],
  (tracks) => tracks.selectedTrack.checksum
);

export const selectPlayingFromSelectedTrack = createSelector(
  [selectTracks],
  (tracks) => tracks.selectedTrack.playing
);

export const selectArrangement = createSelector(
  [selectSelectedTrack],
  (selectedTrack) => selectedTrack.arrangement
);

export const selectCurrentSongPart = createSelector(
  [selectTracks],
  (tracks) => tracks.currentSongPart
);

export const selectNextTrack = createSelector([selectTracks], (tracks) =>
  tracks.playlists ? getNextTrack(tracks.playlists, tracks.selectedTrack) : null
);

export const selectPreviousTrack = createSelector([selectTracks], (tracks) =>
  tracks.playlists
    ? getPreviousTrack(tracks.playlists, tracks.selectedTrack)
    : null
);

export const selectIsTrackSelected = memoize((track) =>
  createSelector([selectSelectedTrack], (selectedTrack) => ({
    selected: selectedTrack.id === track.id,
    playing: selectedTrack.id === track.id && selectedTrack.playing,
  }))
);

export const selectShowArrangementView = createSelector(
  [selectTracks],
  (tracks) => tracks.showArrangementView
);
