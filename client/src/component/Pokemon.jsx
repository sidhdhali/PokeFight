import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Grid, Card, Header } from 'semantic-ui-react';
import './CSS/Pokemon.css'; // Import custom CSS for Pokemon component

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Set the number of items per page

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

  const renderPokemonCard = (pokemon) => (
    <Grid.Column key={pokemon.id}>
      <Card className="pokemon-card"> {/* Apply a custom class for styling */}
        <Card.Content>
          <Card.Header>{pokemon.name.english}</Card.Header>
          <Card.Meta>Type: {pokemon.type.join(', ')}</Card.Meta>
          <Card.Description>
            <Header as="h4">Base Stats</Header>
            <ul>
              {Object.entries(pokemon.base).map(([statName, statValue]) => (
                <li key={statName}>{statName}: {statValue}</li>
              ))}
            </ul>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );

  return (
    <div className="pokemon-container"> {/* Apply a custom class for styling */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Grid stackable columns={3}>
            <Grid.Row>
              {currentPokemons.map((pokemon) => renderPokemonCard(pokemon))}
            </Grid.Row>
          </Grid>
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
      )}
    </div>
  );
}

export default Pokemon;
