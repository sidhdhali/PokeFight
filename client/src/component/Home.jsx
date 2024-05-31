import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination , List } from 'semantic-ui-react';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

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

  // Calculate the paginated Pokémon
  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <ol>
            {currentPokemons.map((pokemon) => (
              <List key={pokemon.id}>
                <Link to={`/pokemon/${pokemon.id}`} >
                  <strong>Name:</strong> {pokemon.name.english}
                </Link>
              </List>
            ))}
          </ol>
          <Pagination
            activePage={currentPage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil(pokemons.length / itemsPerPage)}
            boundaryRange={1}
            siblingRange={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
          />
        </>
      )}
    </div>
  );
}

export default Home;


