import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : pokemon ? (
        <div>
   
              <p><strong>ID:</strong> {pokemon.id}</p>
              <p><strong>Name:</strong></p>
              <ul>
              {Object.entries(pokemon.name).map(([statName, statValue]) => (
                <li key={statName}>
                  {statName}: {statValue}
                </li>
              ))}
            </ul>
          <p><strong>Types:</strong> {pokemon.type.join(', ')}</p>
          <p><strong>Base Stats:</strong></p>
          <ul>
            {Object.entries(pokemon.base).map(([statName, statValue]) => (
              <li key={statName}>
                {statName}: {statValue}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Pokemon data found</p>
      )}
    </div>
  );
}

export default PokemonById;
