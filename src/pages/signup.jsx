import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  return (
    <div className="pageContainer">
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
    <div id="forms">
      <div className='titles'>
        <h1>Sign up!</h1>
      </div>
      <div className="inputsContainer">
        <input
          type="text"
          placeholder='Username'
          value={username}
          onChange={usernameChangeEvent}
          className="textField"
        ></input>
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={passwordChangeEvent}
          className="textField"
        ></input>
        <input
          type="name"
          placeholder='Full Name'
          value={name}
          onChange={nameChangeEvent}
          className="textField"
        ></input>
      </div>
      <div className="buttonHolder">
        <form onSubmit={signUpHandler}>
          <input type="submit" value="Create Account" className="primary-button"></input>
        </form>
        <a href="/">
          <button className='secondary-button'>Cancel</button>
        </a>
      </div>
    </div>
  );
}

export default SignupPage;
