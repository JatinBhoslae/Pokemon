import React from "react";
import "../index.css";

export default function PokemonThumbnail({ pokemon, onSelect }) {
  return (
    <li className="pokemon-thumbnail" onClick={() => onSelect(pokemon)}>
      <figure className="thumbnail-figure">
        <img
          src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          loading="lazy"
          className="thumbnail-img"
        />
      </figure>
      <h3 className="thumbnail-name">{pokemon.name}</h3>
    </li>
  );
}
