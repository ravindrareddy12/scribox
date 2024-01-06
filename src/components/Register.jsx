import React, { useState } from 'react';
import FirestoreService from '../services/FirestoreService';

const Register = () => {
  const [employeeId, setEmployeeId] = useState('');

  const handleRegister = async () => {
    // Check if the employee ID is available
    const isAvailable = await FirestoreService.isEmployeeIdAvailable(employeeId);

    if (isAvailable) {
      // Register the user
      await FirestoreService.registerUser(employeeId);

      alert('Registered successfully');
      // Redirect or perform actions after successful registration
    } else {
      console.log("Registration failed. Employee ID already taken.");
      // Handle registration error (employee ID already taken)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <label style={styles.label}>Employee ID:</label>
      <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} style={styles.input} />
      <button onClick={handleRegister} style={styles.registerButton}>Register</button>
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
