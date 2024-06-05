import React, { useState, useEffect } from "react";
import "./CSS/GameResults.css"; // Import CSS file for styling

function GameResults() {
  const [gameResults, setGameResults] = useState([]);

  useEffect(() => {
    fetchGameResults();
  }, []);

  async function fetchGameResults() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/games/leaderboard"
      );
      const data = await response.json();
      setGameResults(data);
    } catch (error) {
      console.error("Error fetching game results:", error);
    }
  }

  return (
    <div className="game-results-container">
      <h1>Game Results</h1>
      <div className="table-container">
        <table className="game-results-table">
          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Turns</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {gameResults.map((result, index) => (
              <tr key={index}>
                <td>
                  {result.result === "win!"
                    ? result.playerPokemon
                    : result.opponentPokemon}
                </td>
                <td>
                  {result.result === "win!"
                    ? result.opponentPokemon
                    : result.playerPokemon}
                </td>
                <td>{result.turns}</td>
                <td>{new Date(result.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameResults;
