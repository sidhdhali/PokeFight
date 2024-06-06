import React, { useState, useEffect } from "react";
import { Pagination } from "semantic-ui-react"; 
import "./CSS/GameResults.css"; // Import CSS file for styling

function GameResults() {
  const [gameResults, setGameResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

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

  // Calculate the paginated game results
  const indexOfLastResult = currentPage * itemsPerPage;
  const indexOfFirstResult = indexOfLastResult - itemsPerPage;
  const currentResults = gameResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

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
            {currentResults.map((result, index) => (
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
      <Pagination
        activePage={currentPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(gameResults.length / itemsPerPage)}
        boundaryRange={1}
        siblingRange={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        className="pagination"
      />
    </div>
  );
}

export default GameResults;
