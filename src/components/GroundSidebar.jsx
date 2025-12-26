import React from "react";
import "./Sidebar.css";

const groundCategories = [
  { id: 0, name: "All", category: "all" },
  { id: 1, name: "Terrain", category: "terrain" },
  { id: 2, name: "Weather", category: "weather" },
  { id: 3, name: "Special Fields", category: "special" },
];

export default function GroundSidebar({
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Battle Fields</h2>
      <ul className="gen-list">
        {groundCategories.map((category) => (
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
