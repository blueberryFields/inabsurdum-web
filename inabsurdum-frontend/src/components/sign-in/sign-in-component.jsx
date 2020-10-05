import React, { useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

const SignIn = () => {
  const [password, setPassword] = useState('');

  

  return (
    <div className="sign-in">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Lösenord"
          required
        />
        <CustomButton type="submit" >Logga in</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
