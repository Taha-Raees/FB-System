import React, { useState } from 'react';
import { updateUser } from '@/app/apiService/apiService'; // Adjust the path as necessary
import './account.scss';

const Account = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { password };
      const response = await updateUser(userId, userData);
      if (response) {
        setMessage('Password updated successfully.');
        setPassword('');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="account-container">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit} className="account-form">
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Account;
