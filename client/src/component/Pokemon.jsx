import { useState, useEffect } from 'react';
import axios from 'axios';
// import { RotatingLines } from "react-loader-spinner";

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ol>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <p><strong>Name:</strong></p>
              <ul>
              {Object.entries(pokemon.name).map(([statName, statValue]) => (
                <li key={statName}>
                  {statName}: {statValue}
                </li>
              ))}
            </ul>
              <p><strong>Type:</strong> {pokemon.type.join(', ')}</p>
              <p><strong>Base:</strong></p>
              <ul>
                {Object.entries(pokemon.base).map(([statName, statValue]) => (
                  <li key={statName}>
                    {statName}: {statValue}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Pokemon;


// https://pokeapi.co/api/v2/pokemon

// https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json
