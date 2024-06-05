const API_BASE_URL = "http://localhost:3000/game"; // Update with your actual URL

export const saveGameResult = async (
  playerPokemon,
  opponentPokemon,
  result,
  turns
) => {
  const response = await fetch(`${API_BASE_URL}/save`, {
    // Removed `/game` from here
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerPokemon, opponentPokemon, result, turns }),
  });

  if (!response.ok) {
    throw new Error("Failed to save game result");
  }

  const data = await response.json();
  return data;
};

export const getLeaderboard = async () => {
  const response = await fetch(`${API_BASE_URL}/leaderboard`, {
    // Corrected URL here
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  const data = await response.json();
  return data;
};
