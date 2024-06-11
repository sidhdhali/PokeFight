import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Header,
  Grid,
  Segment,
  Card,
  Image,
} from "semantic-ui-react";
import { saveGameResult } from "../utils/api"; // Make sure this path is correct
import axios from "axios";
import "./CSS/Game.css";

const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
        );
        setPokemons(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  const handleSelect = async (e, { value }) => {
    const basicPokemon = pokemons.find((p) => p.id === value);
    const detailedPokemon = await fetchPokemonDetails(
      basicPokemon.name.english.toLowerCase()
    );
    setSelectedPokemon({ ...basicPokemon, details: detailedPokemon });

    // Randomly select the opponent's Pokémon after user selects their Pokémon
    const opponentIndex = Math.floor(Math.random() * pokemons.length);
    const opponentBasic = pokemons[opponentIndex];
    const opponentDetailed = await fetchPokemonDetails(
      opponentBasic.name.english.toLowerCase()
    );
    setOpponentPokemon({ ...opponentBasic, details: opponentDetailed });
  };

  const handleFight = async () => {
    if (!selectedPokemon || !opponentPokemon) return;

    const userPower =
      selectedPokemon.base.Attack +
      selectedPokemon.base.Speed -
      selectedPokemon.base.Defense;
    const opponentPower =
      opponentPokemon.base.Attack +
      opponentPokemon.base.Speed -
      opponentPokemon.base.Defense;
    let fightResult = "";

    if (userPower > opponentPower) {
      fightResult = "win!";
    } else if (userPower < opponentPower) {
      fightResult = "lose!";
    } else {
      fightResult = "draw!";
    }

    setResult(fightResult);
    setTurns(turns + 1);

    try {
      await saveGameResult(
        selectedPokemon.name.english,
        opponentPokemon.name.english,
        fightResult,
        turns + 1
      );
    } catch (error) {
      setError("Failed to save game result: " + error.message);
    }
  };

  const pokemonOptions = pokemons.map((p) => ({
    key: p.id,
    text: p.name.english,
    value: p.id,
  }));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderPokemonCard = (pokemon) => (
    <Card className={`pokemon-card ${pokemon.type[0].toLowerCase()}`}>
      <Image src={pokemon.details.sprites.front_default} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{pokemon.name.english}</Card.Header>
        <Card.Meta>Type: {pokemon.type.join(", ")}</Card.Meta>
        <Card.Description>
          <ul className="pokemon-stats">
            {Object.entries(pokemon.base).map(([statName, statValue]) => (
              <li key={statName}>
                {statName}: {statValue}
              </li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );

  return (
    <Segment className="game-segment">
      <Grid columns={3} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            {selectedPokemon && renderPokemonCard(selectedPokemon)}
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">
              {result || "Select your Pokemon and Fight!"}
            </Header>
            <Dropdown
              placeholder="Select your Pokemon"
              fluid
              selection
              search
              options={pokemonOptions}
              onChange={handleSelect}
            />
            <Button
              primary
              onClick={handleFight}
              disabled={!selectedPokemon || !opponentPokemon}
              style={{
                marginTop: "1em",
                backgroundColor: "#FAE077",
                border: "5px solid",
                borderRadius: "60px",
                padding: "6px 10px 10px 10px",
                fontSize: "24px",
                cursor: "pointer",
                boxShadow: "5px 10px 8px rgba(26, 6, 8, 0.2)",
              }}
            >
              <svg
                width="40x"
                height="40px"
                viewBox="0 -3 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM5.07089 13C5.55612 16.3923 8.47353 19 12 19C15.5265 19 18.4439 16.3923 18.9291 13H14.8293C14.4174 14.1652 13.3062 15 12 15C10.6938 15 9.58251 14.1652 9.17068 13H5.07089ZM18.9291 11C18.4439 7.60771 15.5265 5 12 5C8.47353 5 5.55612 7.60771 5.07089 11H9.17068C9.58251 9.83481 10.6938 9 12 9C13.3062 9 14.4174 9.83481 14.8293 11H18.9291ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  fill="#000000"
                />
              </svg>
              {/* FIGHT ! */}
            </Button>
          </Grid.Column>
          <Grid.Column>
            {opponentPokemon && renderPokemonCard(opponentPokemon)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Game;
