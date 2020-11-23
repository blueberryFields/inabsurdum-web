import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: '',
    password: '',
    message: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.username && state.password) {
      try {
        const response = await axios({
          method: 'post',
          url: 'api/user/login',
          data: {
            username: state.username,
            password: state.password,
          },
        });
        dispatch(setCurrentUser(response.data));
      } catch (error) {
        setState({
          ...state,
          message: 'Fel användarnamn eller lösenord!',
        });
        console.log(error);
      }
    } else {
      setState({
        ...state,
        message: 'Du måste skriva användarnamn och lösenord!',
      });
    }
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="text"
          value={state.username}
          handleChange={handleChange}
          label="Användarnamn"
          required
        />
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
