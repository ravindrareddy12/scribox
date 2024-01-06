import React, { useState } from 'react';
import FirestoreService from '../services/FirestoreService';

const ChallengeForm = () => {
  const [challengeData, setChallengeData] = useState({
    title: '',
    description: '',
    selectedTag: '',
  });

  const [showEmptyDetailsMessage, setShowEmptyDetailsMessage] = useState(false);

  const handleInputChange = (e) => {
    setChallengeData({
      ...challengeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChallenge = async (e) => {
    e.preventDefault();

    const { title, description, selectedTag } = challengeData;

    // Check if title, description, and tag are not empty
    if (!title || !description || !selectedTag) {
      setShowEmptyDetailsMessage(true);
      return;
    }

    const newChallenge = {
      title,
      description,
      tag: selectedTag,
      votes: 0,
      newDate: new Date().toLocaleDateString(),
    };

    await FirestoreService.addChallenge(newChallenge);

    alert('New challenge added successfully');
    setChallengeData({
      title: '',
      description: '',
      selectedTag: '',
    });
    setShowEmptyDetailsMessage(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Challenge</h2>
      {showEmptyDetailsMessage && (
        <p style={styles.errorMessage}>Please fill in title, description, and select a tag.</p>
      )}
      <form onSubmit={handleAddChallenge} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={challengeData.title}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <br />
        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={challengeData.description}
          onChange={handleInputChange}
          style={styles.textarea}
          required
        />
        <br />
        <label style={styles.label}>Tags:</label>
        <select
          name="selectedTag"
          value={challengeData.selectedTag}
          onChange={handleInputChange}
          style={styles.select}
          required
        >
          <option value="">Select a tag</option>
          <option value="feature">Feature</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="challenge">Challenge</option>
        </select>
        <br />
        <input type="submit" value="Submit" style={styles.submitButton} />
      </form>
    </div>
  );
};

const styles = {
  select: {
    width: '200px',  
    height: '35px',  
    padding: '8px',
    marginBottom: '10px',
  },
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
  },
  textarea: {
    padding: '8px',
    marginBottom: '10px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChallengeForm;
