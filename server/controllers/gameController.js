
import Game from '../models/gameSchema.js';

export const postPokemon = async (req, res, next) =>
{
  const { playerPokemon, opponentPokemon, result, turns } = req.body;
  try
  {
    const newGame = new Game({
      playerPokemon , opponentPokemon , result , turns
    })

    const game = await newGame.save()
    res.status(201).json(game);
  }
  catch (error)
  {
    next(error)
  }
  
}


export const getLeaderBoard = async (req, res, next) =>
{
  try
  {
    const games = await Game.find().sort({ date: -1 });
    res.status(200).json(games);
  } catch (error)
  {
    next(error)
  }
}
