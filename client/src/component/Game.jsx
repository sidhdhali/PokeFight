import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Header, Grid, Segment, Card, Image } from 'semantic-ui-react';
import { saveGameResult } from '../utils/api'; // Make sure this path is correct
import axios from 'axios';

const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
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
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const handleSelect = async (e, { value }) => {
    const basicPokemon = pokemons.find(p => p.id === value);
    const detailedPokemon = await fetchPokemonDetails(basicPokemon.name.english.toLowerCase());
    setSelectedPokemon({ ...basicPokemon, details: detailedPokemon });

    // Randomly select the opponent's Pokémon after user selects their Pokémon
    const opponentIndex = Math.floor(Math.random() * pokemons.length);
    const opponentBasic = pokemons[opponentIndex];
    const opponentDetailed = await fetchPokemonDetails(opponentBasic.name.english.toLowerCase());
    setOpponentPokemon({ ...opponentBasic, details: opponentDetailed });
  };

  const handleFight = async () => {
    if (!selectedPokemon || !opponentPokemon) return;

    const userPower = selectedPokemon.base.Attack + selectedPokemon.base.Speed - selectedPokemon.base.Defense;
    const opponentPower = opponentPokemon.base.Attack + opponentPokemon.base.Speed - opponentPokemon.base.Defense;
    let fightResult = '';

    if (userPower > opponentPower) {
      fightResult = 'You win!';
    } else if (userPower < opponentPower) {
      fightResult = 'You lose!';
    } else {
      fightResult = 'It\'s a draw!';
    }

    setResult(fightResult);
    setTurns(turns + 1);

    await saveGameResult(selectedPokemon.name.english, opponentPokemon.name.english, fightResult, turns + 1);
  };

  const pokemonOptions = pokemons.map(p => ({
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
    <Card>
      <Image src={pokemon.details.sprites.front_default} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{pokemon.name.english}</Card.Header>
        <Card.Meta>Type: {pokemon.type.join(', ')}</Card.Meta>
        <Card.Description>
          <ul>
            {Object.entries(pokemon.base).map(([statName, statValue]) => (
              <li key={statName}>{statName}: {statValue}</li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );

  return (
    <Segment>
      <Grid columns={3} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            {selectedPokemon && renderPokemonCard(selectedPokemon)}
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">{result || 'Select your Pokemon and Fight!'}</Header>
            <Dropdown
              placeholder="Select your Pokemon"
              fluid
              selection
              options={pokemonOptions}
              onChange={handleSelect}
            />
            <Button primary onClick={handleFight} disabled={!selectedPokemon || !opponentPokemon} style={{ marginTop: '1em' }}>
              Fight!
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
