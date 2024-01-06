// Login.js
import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/FirestoreService';
import { useNavigate } from 'react-router-dom';
import ChallengeList from './ChallengeList';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
    
  useEffect(() => {
    // This effect will run whenever the isLoggedIn state changes
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = async () => {
    // Check if the employee ID exists in Firestore
    const isEmployeeIdValid = await FirestoreService.isEmployeeIdValid(employeeId);

    if (isEmployeeIdValid) {
      setIsLoggedIn(true);
      navigate('/challenge-list');
      console.log(isLoggedIn)
      alert("Login successful")
    } else {
      setIsLoggedIn(false);
      // Handle login error (employee ID does not exist)
      alert("Employee ID not found")
      console.log("Login failed. Employee ID not found.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <label style={styles.label}>Employee ID:</label>
      <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} style={styles.input} />
      <button onClick={handleLogin} style={styles.loginButton}>Login</button>
      <ChallengeList isLoggedIn={isLoggedIn} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    marginBottom: '15px',
    width: '100%',
    boxSizing: 'border-box',
  },
  loginButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default Login;
