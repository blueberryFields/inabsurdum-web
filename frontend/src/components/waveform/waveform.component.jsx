import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import WaveSurfer from 'wavesurfer.js';

import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { setPlaying } from '../../redux/player/player.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './waveform.styles.scss';

const Waveform = ({ selectedTrack }) => {
  const { checksum, playing, peaks } = selectedTrack;
  const user = useSelector(selectCurrentUser);

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
      // normalize: true,
      backend: 'MediaElement',
      barWidth: 2,
      // xhr: {
      //   requestHeaders: [
      //     {
      //       key: 'Authorization',
      //       value: 'Bearer ' + user.jwt,
      //     },
      //   ],
      // },
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
  }, [dispatch, user.jwt]);

  // Load a new track when url is changed
  useEffect(() => {
    if (checksum) {

      setShowSpinner(true);
      wavesurfer.current.load(
        'http://localhost:8080/jambox/track/load/' + checksum,
        peaks.data
      );
    }
  }, [checksum, dispatch, user.jwt, peaks]);

  // If selected track is set to playing, start playback of wavesurfer
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
