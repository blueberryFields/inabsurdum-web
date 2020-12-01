import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../redux/user/user.actions';
import { unselectTrack } from '../../redux/player/player.actions';
import CustomButton from '../custom-button/custom-button.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import UploadModal from '../upload-modal/upload-modal.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <div className="header">
      {user && (
        <>
          <ToggleContent
            toggle={(show) => (
              <CustomButton onClick={show}>Ladda upp</CustomButton>
            )}
            content={(hide) => (
              <ModalFrame hide={hide} header={'Ladda upp'}>
                <UploadModal hide={hide} />
              </ModalFrame>
            )}
          />

          <h1 className="logo">{user.bandName}</h1>
          {/* <FontAwesomeIcon className="menu-icon" icon={faBars} /> */}

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
