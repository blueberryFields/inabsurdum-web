import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { signInStart } from '../../redux/user/user.actions';
import { selectError } from '../../redux/user/user.selectors';

import './sign-in.styles.scss';

const SignIn = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState();

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = credentials;
    if (username && password) {
      dispatch(signInStart({ username, password }));
    } else {
      setMessage('Du måste skriva användarnamn och lösenord!');
    }
  };

  // Check for errors and set message accordingly
  const error = useSelector(selectError);
  useEffect(() => {
    if (error) {
      if (error.response && error.response.status === 500) {
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
          value={credentials.username}
          handleChange={handleChange}
          label="Användarnamn"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={credentials.password}
          handleChange={handleChange}
          label="Lösenord"
          required
        />
        <CustomButton type="submit">Logga in</CustomButton>
        <div className="message">{message}</div>
      </form>
    </div>
  );
};

export default SignIn;
