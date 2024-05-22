import React, { useState } from 'react';
import "./Login.scss";
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    
    try {
      // Hardcoded credentials
      const hardcodedUser = { username: 'taharaees', password: '0343', firstName: 'Taha', lastName: 'Raees', role: 'Admin', id: 1 };
      
      if (username === hardcodedUser.username && password === hardcodedUser.password) {
        localStorage.setItem("username", hardcodedUser.firstName); // Save username for session
        localStorage.setItem("lastname", hardcodedUser.lastName); // Save lastname for session
        localStorage.setItem("userRole", hardcodedUser.role); // Assuming the user object includes a role
        localStorage.setItem("userId", hardcodedUser.id); // Assuming the user object includes an id
        setIsError(false);
        onSignIn();
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="myBackground">
      {isLoading ? (
        <div className="loadingContainer">
          <CircularProgress />
          <p className="loadingMessage">Login may take up to 10 seconds due to server inactivity. Please wait...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Login;
