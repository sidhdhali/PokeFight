import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PokemonInfo() {
	const { id, info } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
				);
				const pokemonData = response.data.find((p) => p.id === parseInt(id));
				if (pokemonData) {
					setPokemon(pokemonData);
				} else {
					setError("Pokemon not found");
				}
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	const renderInfo = () => {
		if (!pokemon) return null;

		const renderers = {
			name: () => <h1>{pokemon.name.english}</h1>,
			type: () => (
				<p>
					<strong>Types:</strong> {pokemon.type.join(", ")}
				</p>
			),
			base: () => (
				<div>
					<p>
						<strong>Base Stats:</strong>
					</p>
					<ul>
						{Object.entries(pokemon.base).map(([statName, statValue]) => (
							<li key={statName}>
								{statName}: {statValue}
							</li>
						))}
					</ul>
				</div>
			),
		};

		const renderFunction = renderers[info];
		return renderFunction ? (
			renderFunction()
		) : (
			<p>Invalid info parameter. Please use 'name', 'type', or 'base'.</p>
		);
	};

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				renderInfo()
			)}
		</div>
	);
}

export default PokemonInfo;
