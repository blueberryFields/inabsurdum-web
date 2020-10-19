import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';

import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import LoadingProgBar from '../loading-prog-bar/loading-prog-bar.component';
import { setPlaying, setShowControls } from '../../redux/player/player.actions';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack }) => {
  const { url, playing } = selectedTrack;

  const dispatch = useDispatch();

  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadingProgress, setShowLoadingProgress] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const formatCurrentTime = (currentTime) => {
    var hrs = ~~(currentTime / 3600);
    var mins = ~~((currentTime % 3600) / 60);
    var secs = ~~currentTime % 60;

    var ret = '';

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  // Create waveform and start listen to events
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: 'grey',
      cursorColor: 'lightgrey',
      scrollParent: true,
      // autoCenter: true,
      normalize: true,
      // backend: 'MediaElement',
      barWidth: 2,
    });

    // if (url) wavesurfer.current.load(url);

    wavesurfer.current.on('loading', function (percent) {
      setLoadingProgress(percent);
    });

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.9);
      wavesurfer.current.play();
      dispatch(setPlaying(true));
      dispatch(setShowControls(true));
      setShowSpinner(false);
    });

    wavesurfer.current.on('audioprocess', function () {
      setCurrentTime(formatCurrentTime(wavesurfer.current.getCurrentTime()));
    });

    wavesurfer.current.on('seek', function () {
      setCurrentTime(formatCurrentTime(wavesurfer.current.getCurrentTime()));
    });

    wavesurfer.current.on('finish', function () {
      dispatch(setPlaying(false));
    });

    return () => {
      wavesurfer.current.destroy();
      dispatch(setShowControls(false));
    };
  }, [dispatch]);

  // Load a new track when url is changed
  useEffect(() => {
    if (url) {
      dispatch(setShowControls(false));
      setShowLoadingProgress(true);
      setShowSpinner(false);
      wavesurfer.current.load(url);
    }
  }, [url, dispatch]);

  // When track is loaded, hide progress bar and show spinner while rendering peaks
  useEffect(() => {
    if (loadingProgress === 100) {
      setShowSpinner(true);
      setShowLoadingProgress(false);
    }
  }, [loadingProgress]);

  // If selected track is set to palying, start playback of wavesurfer
  useEffect(() => {
    if (wavesurfer.current)
      playing ? wavesurfer.current.play() : wavesurfer.current.pause();
  }, [playing]);

  return (
    <div className="waveform">
      <div className="title">
        {selectedTrack.title} {currentTime}
      </div>
      {showSpinner && <LoadingSpinner />}
      {showLoadingProgress && <LoadingProgBar progress={loadingProgress} />}
      <div ref={waveformRef} />
    </div>
  );
};

export default Waveform;
