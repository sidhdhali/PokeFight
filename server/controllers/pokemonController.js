// import pokedex from "../db/pokedex.json" assert { type: "json" };
import pokedex from "../db/pokedex.js";
export const getAllPokemon = async (req, res, next) => {
  try {
    res.json(pokedex);
  } catch (error) {
    next(error);
  }
};

export const getPokemonById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pokemon = pokedex.find((p) => p.id === parseInt(id));
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).send("Pokemon not found");
    }
  } catch (error) {
    next(error);
  }
};

export const getPokemonByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const pokemon = pokedex.find(
      (p) => p.name.english.toLowerCase() === name.toLowerCase()
    );
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).send("Pokemon not found");
    }
  } catch (error) {
    next(error);
  }
};

// Function to get a single piece of information about a Pokemon by its ID
export const getPokemonInfoById = async (req, res, next) => {
  const { id, info } = req.params;
  try {
    // Find the Pokemon by ID
    const pokemon = pokedex.find((p) => p.id === parseInt(id));
    if (!pokemon) {
      // If Pokemon is not found, send 404 response
      return res.status(404).send("Pokemon not found");
    }

    // Retrieve the requested information
    let pokemonInfo;
    switch (info) {
      case "name":
        pokemonInfo = pokemon.name.english;
        break;
      case "type":
        pokemonInfo = pokemon.type;
        break;
      case "base":
        pokemonInfo = pokemon.base;
        break;
      default:
        return res.status(400).send("Invalid information requested");
    }

    // Send the requested information in the response
    res.json({ [info]: pokemonInfo });
  } catch (error) {
    next(error);
  }
};