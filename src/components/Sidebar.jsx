import React from "react";
import "./Sidebar.css";

const generations = [
  { id: 0, name: "All", limit: 1301, offset: 0 },
  { id: 1, name: "Gen 1", limit: 151, offset: 0 },
  { id: 2, name: "Gen 2", limit: 100, offset: 151 },
  { id: 3, name: "Gen 3", limit: 135, offset: 251 },
  { id: 4, name: "Gen 4", limit: 107, offset: 386 },
  { id: 5, name: "Gen 5", limit: 156, offset: 493 },
  { id: 6, name: "Gen 6", limit: 72, offset: 649 },
  { id: 7, name: "Gen 7", limit: 88, offset: 721 },
  { id: 8, name: "Gen 8", limit: 96, offset: 809 },
  { id: 9, name: "Gen 9", limit: 120, offset: 905 },
];

export default function Sidebar({ selectedGenId, onSelectGen }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Generations</h2>
      <ul className="gen-list">
        {generations.map((gen) => (
          <li
            key={gen.id}
            className={`gen-item ${selectedGenId === gen.id ? "active" : ""}`}
            onClick={() => onSelectGen(gen)}
          >
            {gen.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
