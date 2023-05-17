import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageContainer() {
  return (
    <div id='pageContainer'>
      <Logo id='logo' />
      <LoginContainer />
    </div>
  );
}

function Logo() {
  return (
    <div id='logo'>
      <h1>GameTraits</h1>
    </div>
  );
}

function LoginContainer() {
  return (
    <div id='login'>
      <LoginFeature />
    </div>
  );
}

function LoginFeature() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChangeEvent = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeEvent = (event) => {
    setPassword(event.target.value);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='forms'>
      <h2>Sign up!</h2>
      <p>Username</p>
      <input
        type='text'
        value={username}
        onChange={usernameChangeEvent}
        className='textField'
      ></input>
      <p>Password</p>
      <input
        type='password'
        value={password}
        onChange={passwordChangeEvent}
        className='textField'
      ></input>
      <form onSubmit={signUpHandler}>
        <input type='submit' value='Signup' className='button'></input>
      </form>
      <a href='/'>Click Here to Login</a>
    </div>
  );
}

export default PageContainer;
