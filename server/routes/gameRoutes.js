
import { Router } from 'express';
import * as gameController from '../controllers/gameController.js';


const gamesRouter = Router();

gamesRouter
  .route('/game/save')
  .post(gameController.postPokemon);

gamesRouter
  .route('/game/leaderboard')
.get(gameController.getLeaderBoard);

export default gamesRouter