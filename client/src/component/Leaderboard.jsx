import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "semantic-ui-react";

function Leaderboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/game/leaderboard"
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <Container>
      <h1>Leaderboard</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player Pokémon</Table.HeaderCell>
            <Table.HeaderCell>Opponent Pokémon</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Turns</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {games.map((game) => (
            <Table.Row key={game._id}>
              <Table.Cell>{game.playerPokemon}</Table.Cell>
              <Table.Cell>{game.opponentPokemon}</Table.Cell>
              <Table.Cell>{game.result}</Table.Cell>
              <Table.Cell>{game.turns}</Table.Cell>
              <Table.Cell>{new Date(game.date).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Leaderboard;
