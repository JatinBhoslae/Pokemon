import React from "react";
import "./Sidebar.css";

const leagueCategories = [
  { id: 0, name: "All", category: "all" },
  { id: 1, name: "Kanto/Johto", category: "kanto_johto" },
  { id: 2, name: "Orange", category: "orange" },
  { id: 3, name: "Johto", category: "johto" },
  { id: 4, name: "Hoenn", category: "hoenn" },
  { id: 5, name: "Sinnoh", category: "sinnoh" },
  { id: 6, name: "Unova", category: "unova" },
  { id: 7, name: "Kalos", category: "kalos" },
  { id: 8, name: "Alola", category: "alola" },
  { id: 9, name: "World", category: "world" },
];

export default function PokemonLeagueSidebar({
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">League Categories</h2>
      <ul className="gen-list">
        {leagueCategories.map((category) => (
          <li
            key={category.id}
            className={`gen-item ${
              selectedCategoryId === category.id ? "active" : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};