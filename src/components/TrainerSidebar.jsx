import React from "react";
import "./Sidebar.css";

const trainerCategories = [
  { id: 0, name: "All", category: "all" },
  { id: 1, name: "Kanto", category: "kanto" },
  { id: 2, name: "Johto", category: "johto" },
  { id: 3, name: "Hoenn", category: "hoenn" },
  { id: 4, name: "Sinnoh", category: "sinnoh" },
  { id: 5, name: "Unova", category: "unova" },
  { id: 6, name: "Kalos", category: "kalos" },
  { id: 7, name: "Alola", category: "alola" },
  { id: 8, name: "Galar", category: "galar" },
  { id: 9, name: "Paldea", category: "paldea" },
  { id: 10, name: "Champions", category: "champions" },
  { id: 11, name: "Rivals", category: "rivals" },
  { id: 12, name: "Villains", category: "villains" },
];

export default function TrainerSidebar({
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Trainer Categories</h2>
      <ul className="gen-list">
        {trainerCategories.map((category) => (
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
}
