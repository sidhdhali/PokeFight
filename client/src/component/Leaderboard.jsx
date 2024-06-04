import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/api';
import { Segment, Header, List } from 'semantic-ui-react';

const Leaderboard = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboard = await getLeaderboard();
        setGames(leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Segment>
      <Header as="h2" textAlign="center">Leaderboard</Header>
      <List divided relaxed>
        {games.map((game) => (
          <List.Item key={game._id}>
            <List.Content>
              <List.Header>
                {game.playerPokemon} vs {game.opponentPokemon}
              </List.Header>
              <List.Description>
                Result: {game.result} - Turns: {game.turns} - Date: {new Date(game.date).toLocaleString()}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default Leaderboard;
