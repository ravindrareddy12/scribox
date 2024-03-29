import React, { useState } from 'react';
import FirestoreService from '../services/FirestoreService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (employeeId === '') {
      alert('Please enter valid employee Id');
    }
    
   
    const isAvailable = await FirestoreService.isEmployeeIdAvailable(employeeId);

    if (isAvailable) {
      
      await FirestoreService.registerUser(employeeId);

      alert('Registered successfully');
      navigate('/login');
     
    } else {
      console.log("Registration failed. Employee ID already taken.");
      
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleRegister}>
         <label style={styles.label}>Register Your Employee ID:</label>
      <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} style={styles.input} required/>
      <button onClick={handleRegister} style={styles.registerButton}>Register</button>
      </form>
     
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
  registerButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default Register;
