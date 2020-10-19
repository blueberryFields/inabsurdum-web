export const getNextTrack = (playlists, selectedTrack) => {
  let tracks = [];

  playlists.forEach((playlist) => {
    playlist.tracks.forEach((track) => {
      tracks.push(track);
    });
  });

  let selectedTrackIndex = tracks.findIndex(
    (track) => track.id === selectedTrack.id
  );

  let nextTrack = tracks.find((_, index) => index === selectedTrackIndex + 1);

  console.log(nextTrack);

  return nextTrack || tracks[0];
};

// export const getNextTrack = (playlists, selectedTrack) => {};
