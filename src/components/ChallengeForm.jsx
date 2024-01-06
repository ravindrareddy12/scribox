import React, { useState } from 'react';
import FirestoreService from '../services/FirestoreService';

const ChallengeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); // State variable for selected tag
  const [showEmptyDetailsMessage, setShowEmptyDetailsMessage] = useState(false);

  const handleAddChallenge = async (e) => {
    e.preventDefault();

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

    alert("new challenge added successfully")
    setTitle('');
    setDescription('');
    setSelectedTag('');
    setShowEmptyDetailsMessage(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Challenge</h2>
      {showEmptyDetailsMessage && <p style={styles.errorMessage}>Please fill in title, description, and select a tag.</p>}
      <form onSubmit={handleAddChallenge} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} required />
        <br />
        <label style={styles.label}>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} required />
        <br />
        <label style={styles.label}>Tags:</label>
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} required>
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
