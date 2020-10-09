import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';
import {
  togglePlaying,
  setShowControls,
} from '../../redux/player/player.actions';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack: { url, playing } }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  // const showControls = useSelector(selectShowControls);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wavesurfer.current)
      playing ? wavesurfer.current.play() : wavesurfer.current.pause();
  }, [playing]);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: 'grey',
      cursorColor: 'lightgrey',
      scrollParent: true,
      autoCenter: true,
    });

    if (url) wavesurfer.current.load(url);

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.9);
      wavesurfer.current.play();
      //TODO: change this so it always sets playing to true
      dispatch(togglePlaying());
      dispatch(setShowControls(true));
    });

    wavesurfer.current.on('finish', function () {
      dispatch(togglePlaying());
    });

    return () => {
      wavesurfer.current.destroy();
      dispatch(setShowControls(false));
    };
  }, [dispatch, url]);

  useEffect(() => {
    if (url) wavesurfer.current.load(url);
  }, [url]);

  return <div className="waveform" ref={waveformRef} />;
};

export default Waveform;
