import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    password: '',
    message: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.password === 'secret') {
      dispatch(setCurrentUser({ id: 1 }));
      setState({ ...state, password: '', message: '' });
    } else {
      setState({
        ...state,
        password: '',
        message: 'Fel lösenord!',
      });
    }
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="password"
          type="password"
          value={state.password}
          handleChange={handleChange}
          label="Lösenord"
          required
        />
        <CustomButton type="submit">Logga in</CustomButton>
        <div className="message">{state.message}</div>
      </form>
    </div>
  );
};

export default SignIn;
