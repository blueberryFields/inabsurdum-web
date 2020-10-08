import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === 'secret') {
      dispatch(setCurrentUser({ id: 1 }));
      setPassword('');
    }
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Lösenord"
          required
        />
        <CustomButton type="submit">Logga in</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
