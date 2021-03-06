import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../redux/user/user.actions';
import { unselectTrack } from '../../redux/tracks/tracks.actions';
import CustomButton from '../custom-button/custom-button.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import UploadModal from '../upload-modal/upload-modal.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectPlaylistsIsLoaded } from '../../redux/tracks/tracks.selectors';

import './header.styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const playlistsIsLoaded = useSelector(selectPlaylistsIsLoaded);

  return (
    <div className="header">
      {user && (
        <>
          <ToggleContent
            toggle={(show) => (
              <CustomButton
                onClick={() => {
                  playlistsIsLoaded && show();
                }}
              >
                Ladda upp
              </CustomButton>
            )}
            content={(hide) => (
              <ModalFrame hide={hide} header={'Ladda upp'}>
                <UploadModal hide={hide} />
              </ModalFrame>
            )}
          />
          <h1 className="logo">{user.bandName}</h1>
          <div
            className="sign-out"
            onClick={() => {
              dispatch(signOut());
              dispatch(unselectTrack());
            }}
          >
            LOGGA UT
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
