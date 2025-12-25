import React from "react";
import "../index.css";
import { FaExpandArrowsAlt } from "react-icons/fa";

export default function PokemonCard({ pokemon, onSelect }) {
  return (
    <li className="pokemon-card" onClick={() => onSelect(pokemon)}>
      <div className="card-overlay-icon">
        <FaExpandArrowsAlt />
      </div>
      <figure>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
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
