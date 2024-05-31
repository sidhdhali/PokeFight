import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Segment, Header } from 'semantic-ui-react';

const Leaderboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/game/leaderboard');
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Segment>
      <Header as="h2" textAlign="center">Leaderboard</Header>
      <List>
        {games.map((game, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>Game {index + 1}</List.Header>
              <List.Description>
                {game.playerPokemon} vs {game.opponentPokemon} - {game.result} in {game.turns} turns
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default Leaderboard;
