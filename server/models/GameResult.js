import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema({
  winner: { type: String, required: true },
  loser: { type: String, required: true },
  turns: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const GameResult = mongoose.model("GameResult", gameResultSchema);

export default GameResult;
