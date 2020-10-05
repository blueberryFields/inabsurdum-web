import React, { useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

const SignIn = () => {
  const [password, setPassword] = useState('');

  return (
    <div className="sign-in">
      <FormInput
        name="password"
        type="text"
        value={password}
        handleChange={() => {}}
        label="Lösenord"
        // required
      />
      <CustomButton inverted>Logga in</CustomButton>
    </div>
  );
};

export default SignIn;
