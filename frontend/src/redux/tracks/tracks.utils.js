import isEmpty from 'lodash.isempty';

const getFlattenedTracks = (playlists) => {
  let tracks = [];

  playlists.forEach((playlist) => {
    playlist.tracks.forEach((track) => {
      tracks.push(track);
    });
  });

  return tracks;
};

const getSelectedTrackIndex = (tracks, selectedTrack) => {
  return tracks.findIndex((track) => track.id === selectedTrack.id);
};

const lastIndex = (array) => {
  return array.length - 1;
};

export const getNextTrack = (playlists, selectedTrack) => {
  let tracks = getFlattenedTracks(playlists);
  let selectedTrackIndex = getSelectedTrackIndex(tracks, selectedTrack);

  let nextTrack = tracks.find((_, index) => index === selectedTrackIndex + 1);

  return nextTrack || tracks[0];
};

export const getPreviousTrack = (playlists, selectedTrack) => {
  let tracks = getFlattenedTracks(playlists);
  let selectedTrackIndex = getSelectedTrackIndex(tracks, selectedTrack);

  let nextTrack = tracks.find((_, index) => index === selectedTrackIndex - 1);

  return nextTrack || tracks[lastIndex(tracks)];
};

export const checkCollapsed = (prevPlaylists, newPlaylist) => {
  if (!isEmpty(prevPlaylists)) {
    const matchingPlaylist = prevPlaylists.find(
      (prevPlaylist) => prevPlaylist.id === newPlaylist.id
    );
    console.log(matchingPlaylist);
    return matchingPlaylist ? matchingPlaylist.isCollapsed : true;
  } else return true;
};
