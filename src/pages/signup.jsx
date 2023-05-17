import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
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
      <h1>Sign Up!</h1>
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
  const [name, setName] = useState('');

  const usernameChangeEvent = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeEvent = (event) => {
    setPassword(event.target.value);
  };

  const nameChangeEvent = (event) => {
    setName(event.target.value);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate('/home', { state: { data } });
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
      <p>Full name</p>
      <input
        type='name'
        value={name}
        onChange={nameChangeEvent}
        className='textField'
      ></input>
      <form onSubmit={signUpHandler}>
        <input type='submit' value='Signup' className='button'></input>
      </form>
      <a href='/'>Click Here to Login</a>
    </div>
  );
}

export default SignupPage;
