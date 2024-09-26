"use client"
import React, { useState, useEffect } from 'react';
import "./Login.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import Loading from '@/Components/ui/Loading/Loading';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuickLogin, setIsQuickLogin] = useState(false);
  const router = useRouter();

  const hardcodedUser = { username: 'taharaees', password: '0343', firstName: 'Taha', lastName: 'Raees', role: 'Admin', id: 1 };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading

    try {
      if (username === hardcodedUser.username && password === hardcodedUser.password) {
        // Save user data in localStorage
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("username", hardcodedUser.firstName);
        localStorage.setItem("lastname", hardcodedUser.lastName);
        localStorage.setItem("userRole", hardcodedUser.role);
        localStorage.setItem("userId", hardcodedUser.id);
        
        setIsError(false);

        // Simulate slight delay for better UX while router navigates
        setTimeout(() => {
          router.push('/'); // Redirect to dashboard after successful login
        }, 500); // 500ms delay to give router time to load dashboard
      } else {
        setIsError(true); // Incorrect credentials
        setIsLoading(false); // End loading if login fails
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setIsError(true);
      setIsLoading(false); // End loading in case of error
    }
  };

  const handleQuickLogin = () => {
    setUsername(hardcodedUser.username);
    setPassword(hardcodedUser.password);
    setIsQuickLogin(true);
  };

  useEffect(() => {
    if (isQuickLogin) {
      handleSubmit();
      setIsQuickLogin(false);
    }
  }, [isQuickLogin, username, password]);

  return (
    <div className="myBackground">
      {isLoading ? (
        <div className="loadingContainer">
          <Loading/>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="loginForm">
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
          <button type="button" className="quickLoginButton" onClick={handleQuickLogin}>
            Login for Recruiter
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
