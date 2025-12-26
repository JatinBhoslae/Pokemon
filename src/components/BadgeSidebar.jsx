import React from "react";
import "./Sidebar.css";

const badgeCategories = [
  { id: 0, name: "All", category: "all" },
  { id: 1, name: "Kanto", category: "kanto" },
  { id: 2, name: "Orange", category: "orange" },
  { id: 3, name: "Johto", category: "johto" },
  { id: 4, name: "Hoenn", category: "hoenn" },
  { id: 5, name: "Sinnoh", category: "sinnoh" },
  { id: 6, name: "Unova", category: "unova" },
  { id: 7, name: "Kalos", category: "kalos" },
  { id: 8, name: "Alola", category: "alola" },
];

export default function BadgeSidebar({
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Badge Regions</h2>
      <ul className="gen-list">
        {badgeCategories.map((category) => (
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