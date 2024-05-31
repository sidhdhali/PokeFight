
import { Router } from 'express';
import * as gameController from '../controllers/gameController.js';


const gamesRouter = Router();

gamesRouter
  .route('/save')
  .post(gameController.postPokemon);

gamesRouter
  .route('/leaderboard')
.get(gameController.getLeaderBoard);

export default gamesRouter