import { useState, useEffect } from "react";
import axios from "axios";
import {
  Pagination,
  Grid,
  Card,
  Header,
  Dropdown,
  Input,
  Image,
} from "semantic-ui-react";
import "./CSS/Pokemon.css"; // Import custom CSS for Pokemon component

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Set the number of items per page
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Sort the Pokémon based on the selected sort order
  const sortedPokemons = [...pokemons].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.english.localeCompare(b.name.english);
    } else {
      return b.name.english.localeCompare(a.name.english);
    }
  });

  // Filter Pokémon based on the search term
  const filteredPokemons = sortedPokemons.filter((pokemon) =>
    pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the paginated Pokémon
  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handlePageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handleSortChange = (e, { value }) => {
    setSortOrder(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderPokemonCard = (pokemon) => {
    // Format the Pokémon ID to match the image URL pattern
    const formattedId = String(pokemon.id).padStart(3, "0");
    const imageUrl = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${formattedId}.png`;

    // Determine the card color based on the Pokémon type
    const typeClass = pokemon.type[0].toLowerCase(); // Use the first type as the card color class

    return (
      <Card className={`pokemon-card ${typeClass}`}>
        <Image src={imageUrl} alt={pokemon.name.english} wrapped ui={false} />
        <Card.Content>
          <Card.Header className="card-header">
            {pokemon.name.english}
          </Card.Header>
          <br />
          <Card.Header as="h4">
           Type
          </Card.Header>
          <Card.Meta>{pokemon.type.join(", ")}</Card.Meta>
          <br />
          <Card.Description className="card-description">
            <Header as="h4">Base Stats</Header>
            <ul>
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
  };

  const sortOptions = [
    { key: "asc", text: "Sort by Name (A-Z)", value: "asc" },
    { key: "desc", text: "Sort by Name (Z-A)", value: "desc" },
  ];

  return (
    <div className="pokemon-container">
      <div className="controls">
        <Dropdown
          placeholder="Sort by"
          selection
          options={sortOptions}
          onChange={handleSortChange}
          value={sortOrder}
        />
        <Input
          icon="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Grid stackable columns={3} doubling>
            <Grid.Row centered>
              {currentPokemons.map((pokemon) => (
                <Grid.Column
                  key={pokemon.id}
                  mobile={16}
                  tablet={8}
                  computer={5}
                  largeScreen={5}
                  style={{ marginBottom: "20px" }}
                >
                  {renderPokemonCard(pokemon)}
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Pagination
            activePage={currentPage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil(filteredPokemons.length / itemsPerPage)}
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
