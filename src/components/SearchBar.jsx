import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="search-clear" 
          onClick={() => onSearchChange("")}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;