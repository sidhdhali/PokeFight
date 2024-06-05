import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Pagination,
  List,
  Loader,
  Message,
  Dropdown,
  Input,
} from "semantic-ui-react"; // Import Loader, Message, Dropdown, and Input components
import "./CSS/Home.css";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(23); // Set the number of items per page
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

  const sortOptions = [
    { key: "asc", text: "Sort by Name (A-Z)", value: "asc" },
    { key: "desc", text: "Sort by Name (Z-A)", value: "desc" },
  ];

  return (
    <>
      <div className="home-container">
        {" "}
        {/* Apply a custom class for styling */}
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
          <Loader active inline="centered" /> // Use Loader component to indicate loading state
        ) : error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <>
            <List divided relaxed>
              {" "}
              {/* Use List component for the list of Pokémon */}
              {currentPokemons.map((pokemon) => (
                <List.Item key={pokemon.id}>
                  <List.Content>
                    <Link
                      to={`/pokemon/${pokemon.id}`}
                      className="pokemon-link"
                    >
                      {" "}
                      {/* Apply custom class for link styling */}
                      {pokemon.name.english}
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
        totalPages={Math.ceil(filteredPokemons.length / itemsPerPage)}
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
