// src/components/ChallengeList.js
import React, { useState, useEffect } from 'react';
import ChallengeService from '../services/ChallengeService';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Fetch challenges when the component mounts
    const fetchChallenges = async () => {
      const data = await ChallengeService.getChallenges();
      setChallenges(data);
    };

    fetchChallenges();
  }, []);

  return (
    <div>
      <h2>Challenges</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            {challenge.title} - Votes: {challenge.votes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
