import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination, List, Loader, Message } from 'semantic-ui-react'; // Import Loader and Message components
import './CSS/Home.css'
function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(23); // Set the number of items per page

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
    <>    <div className="home-container"> {/* Apply a custom class for styling */}
      {loading ? (
        <Loader active inline="centered" /> // Use Loader component to indicate loading state
      ) : error ? (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      ) : (
        <>
          <List divided relaxed> {/* Use List component for the list of Pokémon */}
            {currentPokemons.map((pokemon) => (
              <List.Item key={pokemon.id}>
                <List.Content>
                <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link"> {/* Apply custom class for link styling */}
                <strong>Name:</strong> {pokemon.name.english}
              </Link>
                </List.Content>
              </List.Item>
            ))}
          </List>
       
        </>
      )}

    </div>
    <Pagination
    activePage={currentPage}
    onPageChange={handlePageChange}
    totalPages={Math.ceil(pokemons.length / itemsPerPage)}
    boundaryRange={1}
    siblingRange={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    className="pagination" // Apply a custom class for pagination styling
  />
    </>

  );
}

export default Home;
