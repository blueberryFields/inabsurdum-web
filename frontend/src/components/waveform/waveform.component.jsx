import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';

import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { setPlaying } from '../../redux/player/player.actions';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack }) => {
  const { url, playing } = selectedTrack;

  const dispatch = useDispatch();

  const [showSpinner, setShowSpinner] = useState(false);
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
      autoCenter: true,
      normalize: true,
      backend: 'MediaElement',
      barWidth: 2,
    });

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.9);
      wavesurfer.current.play();
      dispatch(setPlaying(true));
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
    };
  }, [dispatch]);

  // Load a new track when url is changed
  useEffect(() => {
    if (url) {
      setShowSpinner(true);
      wavesurfer.current.load(url);
    }
  }, [url, dispatch]);

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
      <div ref={waveformRef} />
    </div>
  );
};

export default Waveform;
