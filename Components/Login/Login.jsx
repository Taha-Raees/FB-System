import React, { useState } from 'react';
import "./Login.scss";

const Login = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsError(false);
      onSignIn();
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="myBackground">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`inputField ${isError ? 'error' : ''}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`inputField ${isError ? 'error' : ''}`}
        />
        <button type="submit" className="loginButton">Log In</button>
        {isError && <p className="errorMessage">Incorrect username or password.</p>}
      </form>
    </div>
  );
};

export default Login;

