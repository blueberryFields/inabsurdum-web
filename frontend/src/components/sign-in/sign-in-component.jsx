import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { signInStart } from '../../redux/user/user.actions';
import { selectError } from '../../redux/user/user.selectors';

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

  const setMessage = useCallback((message) => {
    setState((prevState) => ({
      ...prevState,
      message,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = state;
    if (username && password) {
      dispatch(signInStart({ username, password }));
    } else {
      setMessage('Du måste skriva användarnamn och lösenord!');
    }
  };

  const error = useSelector(selectError);
  useEffect(() => {
    if (error) {
      if (error.response.status === 500) {
        setMessage('Fel användarnamn eller lösenord!');
      } else setMessage('Någonting gick fel.');
    }
  }, [error, setMessage]);

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
