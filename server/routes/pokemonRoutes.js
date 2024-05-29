import express from "express";
import {
  getAllPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonInfoById,
} from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getAllPokemon);
router.get("/:id", getPokemonById);
router.get("/name/:name", getPokemonByName);
router.get("/:id/:info", getPokemonInfoById);

export default router;