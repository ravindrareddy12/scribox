import React from 'react';
import { Link } from 'react-router-dom';
import ChallengeList from './ChallengeList';

function HomePage() {
  return (
    <div style={styles.container} className="homepage-container">
      <h1 style={styles.title} className="homepage-title">Welcome to the Homepage!</h1>
      <div style={styles.optionsContainer} className="options-container">
        <p style={styles.optionsText} className="options-text">Choose an option:</p>
        <ul style={styles.optionsList} className="options-list">
          <li>
            <Link to="/login" style={styles.optionLink} className="option-link">Login</Link>
          </li>
          <li>
            <Link to="/register" style={styles.optionLink} className="option-link">Register</Link>
          </li>
        </ul>
      </div>
      <ChallengeList />
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#007BFF',
  },
  optionsContainer: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  optionsText: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  optionsList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  optionLink: {
    textDecoration: 'none',
    padding: '10px',
    margin: '0 10px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default HomePage;
    