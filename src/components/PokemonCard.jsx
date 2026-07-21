import React from "react";
import "../index.css";
import { FaExpandArrowsAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { usePokemonStore } from "../store/usePokemonStore";

export default function PokemonCard({ pokemonUrl, pokemonName, onSelect }) {
  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ["pokemonDetails", pokemonName],
    queryFn: async () => {
      const res = await fetch(pokemonUrl);
      return await res.json();
    },
  });

  const { toggleFavorite, isFavorite } = usePokemonStore();
  const fav = isFavorite(pokemonName);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Don't trigger the modal open
    toggleFavorite({ name: pokemonName, url: pokemonUrl });
  };

  if (isLoading) {
    return (
      <li className="pokemon-card skeleton" style={{ minHeight: "350px", background: "#f0f2f5" }}>
        <div style={{ height: "150px", background: "#e2e8f0", borderRadius: "8px", margin: "10px" }} />
        <div style={{ height: "24px", background: "#e2e8f0", borderRadius: "4px", margin: "10px 20px" }} />
        <div style={{ height: "40px", background: "#e2e8f0", borderRadius: "4px", margin: "10px 20px" }} />
      </li>
    );
  }

  if (error || !pokemon) {
    return (
      <li className="pokemon-card error">
        <p>Failed to load {pokemonName}</p>
      </li>
    );
  }

  return (
    <li className="pokemon-card" onClick={() => onSelect(pokemon)} style={{ position: "relative" }}>
      <button 
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "4.8rem",
          left: "1.6rem",
          background: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          color: fav ? "#e74c3c" : "#7f8c8d"
        }}
      >
        {fav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </button>

      <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
      <div className="card-overlay-icon">
        <FaExpandArrowsAlt />
      </div>
      <figure>
        <img
          src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          loading="lazy"
          width="150"
          height="150"
        />
      </figure>

      <h1 className="pokemon-name">{pokemon.name}</h1>

      <div className="pokemon-highlight">
        <p>{pokemon.types.map((curType) => curType.type.name).join(", ")}</p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>{pokemon.height}</p>
          <span>Height</span>
        </div>
        <div className="pokemon-info">
          <p>{pokemon.weight}</p>
          <span>Weight:</span>
        </div>
        <div className="pokemon-info">
          <p>{pokemon.stats[5].base_stat}</p>
          <span>Speed:</span>
        </div>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>{pokemon.base_experience}</p>
          <span>Experience:</span>
        </div>

        <div className="pokemon-info">
          <p>{pokemon.stats[1].base_stat}</p>
          <span>Attack:</span>
        </div>

        <div className="pokemon-info">
          <p>
            {pokemon.abilities
              .map((abilitiyInfo) => abilitiyInfo.ability.name)
              .slice(0, 1)}
          </p>
          <span>Abilities:</span>
        </div>
      </div>
    </li>
  );
}
