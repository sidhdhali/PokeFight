// Leaderboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/game/leaderboard');
        console.log(response.data)
        if (Array.isArray(response.data))
        { // Check if response data is an array
     
          setGames(response.data);
          setLoading(false);
        } else {
          setError('Data is not in the expected format');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ol>
          {games.map((game) => (
            <li key={game._id}>
              Winner: {game.winner}, Loser: {game.loser}, Turns: {game.turns}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
