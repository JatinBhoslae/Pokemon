import React, { useEffect, useState } from "react";
import "../index.css";
import PokemonCard from "../components/PokemonCard";
import PokemonThumbnail from "../components/PokemonThumbnail";
import PokemonModal from "../components/PokemonModal";
import Sidebar from "../components/Sidebar";

export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedGen, setSelectedGen] = useState({
    id: 0,
    name: "All",
    limit: 1301,
    offset: 0,
  });

  const fetchApi = async () => {
    setLoading(true);
    try {
      const API = `https://pokeapi.co/api/v2/pokemon?limit=${selectedGen.limit}&offset=${selectedGen.offset}`;
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
  }, [selectedGen]);

  const SearchData = pokemonList.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <header>
        <h1>Pokédex</h1>
      </header>

      <div className="main-layout">
        <Sidebar selectedGenId={selectedGen.id} onSelectGen={setSelectedGen} />

        <div className="content-area">
          <div className="pokemon-search">
            <input
              type="text"
              placeholder="Search Pokemon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading-container">
              <h2 className="loading-msg">Loading {selectedGen.name}...</h2>
            </div>
          ) : error ? (
            <div className="error-container">
              <h2 className="error-msg">{error.message}</h2>
            </div>
          ) : (
            <ul className="cards">
              {SearchData.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={setSelectedPokemon}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </section>
  );
}
