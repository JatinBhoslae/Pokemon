import React from "react";
import "../index.css";

const leagues = [
  { id: 1, name: "Indigo League", region: "Kanto", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png" },
  { id: 2, name: "Johto League", region: "Johto", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png" },
  { id: 3, name: "Hoenn League", region: "Hoenn", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/explorer-kit.png" },
  { id: 4, name: "Sinnoh League", region: "Sinnoh", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dowsing-machine.png" },
];

export default function Leagues() {
  return (
    <section className="container">
      <header>
        <h1>Leagues</h1>
      </header>
      <ul className="cards">
        {leagues.map((league) => (
          <li key={league.id} className="pokemon-card">
            <span className="pokemon-id">#{String(league.id).padStart(3, "0")}</span>
            <figure>
              <img
                src={league.image}
                alt={league.name}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            </figure>
            <h1 className="pokemon-name">{league.name}</h1>
            <div className="pokemon-highlight">
              <p>{league.region}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
