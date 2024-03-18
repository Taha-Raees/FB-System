import React, { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/apiService'; // Ensure this is the correct import path
import "./Login.scss";
import CircularProgress from '@mui/material/CircularProgress';


const Login = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const user = users.find(u => u.email === username && u.password === password);
    if (user) {
      localStorage.setItem("username", user.firstName); // Save username for session
      localStorage.setItem("lastname", user.lastName); // Save username for session
      localStorage.setItem("userRole", user.role); // Assuming the user object includes a role
      localStorage.setItem("userId", user.id); // Assuming the user object includes a role
      setIsError(false);
      onSignIn();
    } else {
      setIsError(true);
    }
    setIsLoading(false); // End loading
  };


  return (
    <div className="myBackground">
    {isLoading ? (
      <div className="loadingContainer">
        <CircularProgress />
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
     {isError && <p className="errorMessage">Incorrect username or password.</p>}
   </div>
  );
};

export default Login;

