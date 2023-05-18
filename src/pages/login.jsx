import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="pageContainer">
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
    <div id="forms">
      <div className="titles">
        <h1 id="page-title">Login Page</h1>
        <h2 id="welcome">Welcome Back!</h2>
      </div>
      <div className="inputsContainer">
        <input
          type="text"
          value={username}
          onChange={usernameChangeEvent}
          placeholder="Username"
          className="textField"
        ></input>
        <input
          type="password"
          value={password}
          onChange={passwordChangeEvent}
          placeholder="Password"
          className="textField"
        ></input>
      </div>
      <div className="buttonHolder">
        <form onSubmit={handleLogin}>
          <input
            id="login-button"
            type="submit"
            value="Login"
            className="primary-button"
          ></input>
        </form>
        <a id="signup-button" href="/signup">
          <button className="secondary-button">Create Account</button>
        </a>
      </div>
    </div>
  );
}
export default LoginPage;
