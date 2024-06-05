import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message, Loader, List, Card } from 'semantic-ui-react';
import axios from 'axios';
import './CSS/PokemonById.css';

function PokemonById() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
        const pokemonData = response.data.find(p => p.id === parseInt(id));
        if (pokemonData) {
          setPokemon(pokemonData);
        } else {
          setError('Pokemon not found');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="pokemon-details-container">
      {loading ? (
        <Loader active inline="centered" className="loader" />
      ) : error ? (
        <Message negative className="error-message">
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      ) : pokemon ? (
        <Card>
          <Card.Header className="pokemon-id"><strong>ID:</strong> {pokemon.id}</Card.Header>
          <List divided relaxed className="pokemon-details-list">
            <List.Item className="pokemon-details-list-item">
              <List.Content>
                <List.Header className="pokemon-details-list-header">Name:</List.Header>
                <List.Description>
                  <ul>
                    {Object.entries(pokemon.name).map(([lang, name]) => (
                      <li key={lang}><strong>{lang}:</strong> {name}</li>
                    ))}
                  </ul>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
          <p className="pokemon-types"><strong>Types:</strong> {pokemon.type.join(', ')}</p>
          <List divided relaxed className="pokemon-base-stats">
            <List.Item className="base-stats-list-item">
              <List.Content>
                <List.Header className="base-stats-list-header">Base Stats:</List.Header>
                <List.Description>
                  <ul className="base-stats-list">
                    {Object.entries(pokemon.base).map(([statName, statValue]) => (
                      <li key={statName}><strong>{statName}:</strong> {statValue}</li>
                    ))}
                  </ul>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Card>
      ) : (
        <Message negative className="error-message">
          No Pokemon data found
        </Message>
      )}
    </div>
  );
}

export default PokemonById;
