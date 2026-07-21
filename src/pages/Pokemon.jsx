import React, { useEffect, useState } from "react";
import "../index.css";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "../store/usePokemonStore";

export default function Pokemon() {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedGen, setSelectedGen] = useState({
    id: 0,
    name: "All",
    limit: 1301,
    offset: 0,
  });

  const [visibleCount, setVisibleCount] = useState(20);
  const { ref, inView } = useInView();
  const favoritePokemon = usePokemonStore((state) => state.favoritePokemon);

  // Reset visible count when gen or search changes
  useEffect(() => {
    setVisibleCount(20);
  }, [selectedGen, search]);

  // Load next page when reaching bottom
  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => prev + 20);
    }
  }, [inView]);

  const { data: rawList = [], isLoading, error } = useQuery({
    queryKey: ["pokemonList", selectedGen.id, selectedGen.limit, selectedGen.offset],
    queryFn: async () => {
      const API = `https://pokeapi.co/api/v2/pokemon?limit=${selectedGen.limit}&offset=${selectedGen.offset}`;
      const res = await fetch(API);
      const data = await res.json();
      return data.results; // array of { name, url }
    },
    enabled: selectedGen.id !== "favorites",
  });

  const pokemonList = selectedGen.id === "favorites" ? favoritePokemon : rawList;

  const filteredData = pokemonList.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <section className="container">
      <header>
        <h1>Pokémon</h1>
      </header>
      <div className="main-layout">
        <Sidebar 
          selectedGenId={selectedGen.id} 
          onSelectGen={setSelectedGen} 
        />
        <div className="content-area">
          {isLoading && selectedGen.id !== "favorites" ? (
            <div className="loading">Loading {selectedGen.name}...</div>
          ) : error ? (
            <div className="error-msg">{error.message}</div>
          ) : (
            <>
              <div className="pokemon-search">
                <input
                  type="text"
                  placeholder="Search Pokémon"
                  value={search}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // Note: standard search local state
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ul className="cards">
                {visibleData.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    pokemonUrl={pokemon.url}
                    pokemonName={pokemon.name}
                    onSelect={setSelectedPokemon}
                  />
                ))}
              </ul>
              {/* Load more sentinel */}
              {visibleCount < filteredData.length && (
                <div ref={ref} className="loading-more" style={{ height: "40px", margin: "20px 0", textAlign: "center" }}>
                  Loading more Pokémon...
                </div>
              )}
              {filteredData.length === 0 && (
                <div className="no-results">
                  {search ? "No Pokémon found matching your search." : "No Pokémon found."}
                </div>
              )}
            </>
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
