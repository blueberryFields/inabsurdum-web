import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';

import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import {
  togglePlaying,
  setShowControls,
} from '../../redux/player/player.actions';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack }) => {
  const { url, playing } = selectedTrack;

  const [showSpinner, setShowSpinner] = useState(false);

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
      normalize: true,
      // backend: 'MediaElement',
      // barWidth: 1,
    });

    if (url) wavesurfer.current.load(url);

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.9);
      wavesurfer.current.play();
      //TODO: change this so it always sets playing to true
      dispatch(togglePlaying());
      dispatch(setShowControls(true));
      setShowSpinner(false);
    });

    wavesurfer.current.on('finish', function () {
      dispatch(togglePlaying());
    });

    return () => {
      wavesurfer.current.destroy();
      dispatch(setShowControls(false));
      setShowSpinner(false);
    };
  }, [dispatch, url]);

  useEffect(() => {
    if (url) {
      setShowSpinner(true);
      wavesurfer.current.load(url);
    }
  }, [url]);

  return (
    <div className="waveform">
      <div className="title">{selectedTrack.title}</div>
      {showSpinner && <LoadingSpinner />}
      <div ref={waveformRef} />
    </div>
  );
};

export default Waveform;
