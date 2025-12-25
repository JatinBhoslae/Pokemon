import React, { useEffect, useState } from "react";
import "../index.css";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";

export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=1301";

  const fetchApi = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          return await res.json();
        })
      );

      setPokemonList(detailedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const SearchData = pokemonList.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <h2 className="loading-msg">Loading Pokédex...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-msg">{error.message}</h2>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Pokédex</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="cards">
        {SearchData.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={setSelectedPokemon}
          />
        ))}
      </ul>
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </section>
  );
}
