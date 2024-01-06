import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/FirestoreService';

const ChallengeList = ({ isLoggedIn }) => {
  const [challenges, setChallenges] = useState([]);
  const [sortOption, setSortOption] = useState('votes'); // Default sort by votes

  useEffect(() => {
    const unsubscribe = FirestoreService.onChallengesUpdate((updatedChallenges) => {
      setChallenges(updatedChallenges);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleVoteClick = async (challengeId) => {
    if (isLoggedIn) {
      alert('Please log in to vote.'); 
      return;
    }
    await FirestoreService.incrementVotes(challengeId);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedChallenges = [...challenges].sort((a, b) => {
    if (sortOption === 'votes') {
      return b.votes - a.votes; 
    } else if (sortOption === 'low votes') {
      return a.votes - b.votes;
    } else if (sortOption === 'creationDate') {
      return a.newDate - b.newDate; 
    } else {
      
      return 0;
    }
  });

  return (
    <div style={styles.container}>
      
      <h2 style={styles.heading}>Challenges</h2>
      <div style={styles.sortOptions}>
        <label>Sort by:</label>
        <select value={sortOption} onChange={handleSortChange} style={styles.select}>
          <option value="votes">High Votes</option>
          <option value="low votes">Low Votes</option>
          <option value="creationDate">Creation Date</option>
        </select>
      </div>
      <ul style={styles.list}>
        {sortedChallenges.map((challenge) => (
          <li key={challenge.id} style={styles.listItem}>
            {console.log(challenge)}
            <span style={styles.challengeTitle}>{challenge.title}</span>
            <div>
              Description: {challenge.description}<br />
              creation Date: {challenge.newDate}<br />
              Votes: {challenge.votes}<br/>
              tags: {challenge.tag}
            </div>
            <button onClick={() => handleVoteClick(challenge.id)} style={styles.voteButton}>
              Vote
            </button>
          </li>
        ))}
      </ul>
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
  sortOptions: {
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeTitle: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  voteButton: {
    padding: '8px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default ChallengeList;
