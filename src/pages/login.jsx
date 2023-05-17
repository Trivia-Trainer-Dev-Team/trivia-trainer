import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
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
      <h1>Login Page</h1>
    </div>
  );
}

function LoginContainer() {
  return (
    <div id='get'>
      <LoginFeature />
    </div>
  );
}

export function LoginFeature() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChangeEvent = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeEvent = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/users/?username=${username}&password=${password}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
      <h2>Welcome Back!</h2>
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
      <form onSubmit={handleLogin}>
        <input type='submit' value='Login' className='button'></input>
      </form>
      <a href='/signup'>Click Here To Sign Up!</a>
    </div>
  );
}
export default LoginPage;
