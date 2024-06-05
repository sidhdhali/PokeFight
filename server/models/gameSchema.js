import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  playerPokemon: {
    type: String,
    required: true
  },
  opponentPokemon: {
    type: String,
    required: true
  },
  result: {
    type: String, 
    required: true
  },
  turns: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Game', gameSchema);
