import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WaveSurfer from 'wavesurfer.js';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import {
  setPlaying,
  setCurrentSongPart,
} from '../../redux/tracks/tracks.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectSelectedTrack,
  selectCurrentSongPart,
  selectChecksumFromSelectedTrack,
  selectPlayingFromSelectedTrack,
  selectArrangmentFromSelectedTrack,
  selectPeaksFromSelectedTrack,
} from '../../redux/tracks/tracks.selectors';

import TrackControls from '../track-controls/track-controls.component';

import './audio-player.styles.scss';

const AudioPlayer = () => {
  const user = useSelector(selectCurrentUser);

  const selectedTrack = useSelector(selectSelectedTrack);
  const peaks = useSelector(selectPeaksFromSelectedTrack);
  const checksum = useSelector(selectChecksumFromSelectedTrack);
  const playing = useSelector(selectPlayingFromSelectedTrack);

  const arrangement = useSelector(selectArrangmentFromSelectedTrack);
  // Needed to avoid useEffect retriggering via deps
  const arrangementRef = useRef(arrangement);
  useEffect(() => {
    arrangementRef.current = arrangement;
  }, [arrangement]);

  const currentSongPart = useSelector(selectCurrentSongPart);
  // Needed to avoid useEffect retriggering via deps
  const currentSongPartRef = useRef(currentSongPart);
  useEffect(() => {
    currentSongPartRef.current = currentSongPart;
  }, [currentSongPart]);
  const [currentSongPartTitle, setCurrentSongPartTitle] = useState('');

  const dispatch = useDispatch();

  const [showSpinner, setShowSpinner] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const waveformRef = useRef(null);

  const wavesurfer = useRef(null);

  const calculateAndSetCurrentSongPart = useCallback(
    (currentTime) => {
      if (arrangementRef.current) {
        const currentSongPart = arrangementRef.current.songParts.find(
          (part) => {
            const startingAt = hmsToSeconds(part.startingAt);
            const endingAt = hmsToSeconds(part.endingAt);
            return currentTime > startingAt && currentTime < endingAt;
          }
        );
        if (currentSongPart) {
          if (currentSongPart.arrSequenceNo !== currentSongPartRef.current) {
            dispatch(setCurrentSongPart(currentSongPart.arrSequenceNo));
            setCurrentSongPartTitle(currentSongPart.title);
          }
        } else if (currentSongPartRef.current !== null) {
          dispatch(setCurrentSongPart(null));
          setCurrentSongPartTitle('');
        }
      }
    },
    [dispatch]
  );

  const hmsToSeconds = (hms) => {
    let a = hms.split(':');
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  };

  // This ref is needed to be able to configure waveform creation
  // without triggering the useEffect every time user changes scroll lock
  const scrollLockRef = useRef(false);
  const [scrollIsLocked, setScrollIsLocked] = useState(false);

  useEffect(() => {
    const mobileOrTablet = window.mobileAndTabletCheck();
    scrollLockRef.current = mobileOrTablet;
    setScrollIsLocked(mobileOrTablet);
  }, []);

  const toggleScroll = () => {
    scrollLockRef.current = !scrollLockRef.current;
    setScrollIsLocked(!scrollIsLocked);
    wavesurfer.current.toggleScroll();
  };

  // Create waveform and start listen to events
  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: 'grey',
      cursorColor: 'lightgrey',
      scrollParent: scrollLockRef.current,
      autoCenter: true,
      backend: 'MediaElement',
      barWidth: 2,
      // This does not work with backend: MediaElement
      // xhr: {
      //   headers: [
      //     {
      //       key: 'Authorization',
      //       value: 'Bearer ' + user.jwt,
      //     },
      //   ],
      // },
    });

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(volumeRef.current);
      wavesurfer.current.play();
      dispatch(setPlaying(true));
      setShowSpinner(false);
    });

    wavesurfer.current.on('audioprocess', function () {
      const currentTime = wavesurfer.current.getCurrentTime();
      setCurrentTime(formatCurrentTime(currentTime));
      calculateAndSetCurrentSongPart(currentTime);
    });

    wavesurfer.current.on('seek', function () {
      const currentTime = wavesurfer.current.getCurrentTime();
      setCurrentTime(formatCurrentTime(currentTime));
      calculateAndSetCurrentSongPart(currentTime);
    });

    wavesurfer.current.on('finish', function () {
      dispatch(setPlaying(false));
    });

    // Load track if checksum and peaks exist
    if (checksum && peaks) {
      setShowSpinner(true);
      wavesurfer.current.load('api/track/load/' + checksum, peaks.data);
    }

    return () => {
      wavesurfer.current.destroy();
    };
  }, [checksum, dispatch, peaks, calculateAndSetCurrentSongPart, user.jwt]);

  const [volume, setVolume] = useState(0.75);
  const volumeRef = useRef(volume);

  // Set volume of wavesurfer and volumeRef when volume is changed
  useEffect(() => {
    if (wavesurfer.current) wavesurfer.current.setVolume(volume);
    volumeRef.current = volume;
  }, [volume]);

  // If selected track is set to playing, start playback of wavesurfer
  useEffect(() => {
    if (wavesurfer.current)
      playing ? wavesurfer.current.play() : wavesurfer.current.pause();
  }, [playing]);

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

  window.mobileAndTabletCheck = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  return (
    <div className="audio-player">
      <TrackControls
        selectedTrack={selectedTrack}
        toggleScroll={toggleScroll}
        scrollIsLocked={scrollIsLocked}
        volume={volume}
        setVolume={setVolume}
      />
      <div className="waveform">
        <div className="title">
          {selectedTrack.title} {currentSongPartTitle} {currentTime}
        </div>
        {showSpinner && <LoadingSpinner absolutePosition />}
        <div ref={waveformRef} />
      </div>
    </div>
  );
};

export default AudioPlayer;
