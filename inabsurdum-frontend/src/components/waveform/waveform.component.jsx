import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';
import { setPlaying } from '../../redux/player/player.actions';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack: { url, playing } }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

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
      dispatch(setPlaying());
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  return <div className="waveform" ref={waveformRef} />;
};

export default Waveform;
