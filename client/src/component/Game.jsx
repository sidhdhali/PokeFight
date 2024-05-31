import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dropdown, Header, Grid, Segment, Card, Image } from 'semantic-ui-react';

const Game = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  };

  const handleFight = async () => {
    const opponentIndex = Math.floor(Math.random() * pokemons.length);
    const opponentBasic = pokemons[opponentIndex];
    const opponentDetailed = await fetchPokemonDetails(opponentBasic.name.english.toLowerCase());
    setOpponentPokemon({ ...opponentBasic, details: opponentDetailed });

    const userPower = selectedPokemon.base.Attack + selectedPokemon.base.Speed - selectedPokemon.base.Defense;
    console.log(userPower)
    const opponentPower = opponentBasic.base.Attack + opponentBasic.base.Speed - opponentBasic.base.Defense;
    console.log(opponentPower)
    if (userPower > opponentPower) {
      setResult('You win!');
    } else if (userPower < opponentPower) {
      setResult('You lose!');
    } else {
      setResult('It\'s a draw!');
    }
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
      <Header as="h2" textAlign="center">PokeFight</Header>
      <Grid columns={3} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            {selectedPokemon && renderPokemonCard(selectedPokemon)}
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="Select your Pokemon"
              fluid
              selection
              options={pokemonOptions}
              onChange={handleSelect}
            />
            <Button primary onClick={handleFight} disabled={!selectedPokemon} style={{ marginTop: '1em' }}>
              Fight!
            </Button>
          </Grid.Column>
          <Grid.Column>
            {opponentPokemon && renderPokemonCard(opponentPokemon)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {result && (
        <Segment textAlign="center">
          <Header as="h2">{result}</Header>
        </Segment>
      )}
    </Segment>
  );
};

export default Game;
