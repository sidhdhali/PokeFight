import Game from "../models/gameSchema.js";

export const postPokemon = async (req, res) => {
  try {
    const { playerPokemon, opponentPokemon, result, turns } = req.body;

    // Data validation
    if (!playerPokemon || !opponentPokemon || !result || turns == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newGame = new Game({
      playerPokemon,
      opponentPokemon,
      result,
      turns,
    });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

export const getLeaderBoard = async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.status(200).json(games);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
