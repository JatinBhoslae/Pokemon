import React, { useState, useEffect } from "react";
import "../index.css";
import { FaExpandArrowsAlt } from "react-icons/fa";
import GroundModal from "../components/GroundModal";
import GroundSidebar from "../components/GroundSidebar";

const Grounds = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGround, setSelectedGround] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "All",
    category: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await import("../data/battle_filed.json");
        const data = response.default || response;
        const allGrounds = data.battle_terrains || [];
        setGrounds(allGrounds);
        setLoading(false);
      } catch (error) {
        console.error("Error loading ground data:", error);
        setGrounds([]);
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  // Function to get grounds based on selected category
  const getGroundsByCategory = (category) => {
    if (category.id === 0) return grounds; // All

    switch (category.category) {
      case "terrain":
        return grounds.filter((ground) =>
          ground.type.toLowerCase().includes("terrain")
        );
      case "weather":
        return grounds.filter((ground) =>
          ground.type.toLowerCase().includes("weather")
        );
      case "special":
        return grounds.filter(
          (ground) =>
            ground.type.toLowerCase().includes("field") &&
            !ground.type.toLowerCase().includes("terrain") &&
            !ground.type.toLowerCase().includes("weather")
        );
      default:
        return grounds;
    }
  };

  const handleGroundClick = (ground) => {
    setSelectedGround(ground);
  };

  const closeModal = () => {
    setSelectedGround(null);
  };

  // Get grounds based on selected category
  const filteredGrounds = getGroundsByCategory(selectedCategory);
  
  const searchGrounds = filteredGrounds.filter(ground =>
    ground.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="container">
        <header>
          <h1>Grounds</h1>
        </header>
        <div className="loading-container">
          <h2 className="loading-msg">Loading Battle Grounds...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Grounds</h1>
      </header>

      <div className="main-layout">
        <GroundSidebar
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={setSelectedCategory}
        />

        <div className="content-area">
          <div className="pokemon-search">
            <input
              type="text"
              placeholder="Search Grounds"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="cards">
            {searchGrounds.map((ground) => (
              <li 
                key={ground.id} 
                className="pokemon-card"
                onClick={() => setSelectedGround(ground)}
                style={{ cursor: "pointer" }}
              >
                <span className="pokemon-id">#{String(grounds.indexOf(ground) + 1).padStart(3, "0")}</span>
                <div className="card-overlay-icon">
                  <FaExpandArrowsAlt />
                </div>
                <figure>
                  <img
                    src={
                      ground.image ||
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    }
                    alt={ground.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </figure>
                <h1 className="pokemon-name">{ground.name}</h1>
                <div className="pokemon-highlight">
                  <p>{ground.type}</p>
                </div>
              </li>
            ))}
          </ul>
          {searchGrounds.length === 0 && (
            <div className="no-results">
              {searchTerm ? "No grounds found matching your search." : "No grounds found for the selected category."}
            </div>
          )}
        </div>
      </div>
      {selectedGround && (
        <GroundModal 
          ground={selectedGround} 
          onClose={() => setSelectedGround(null)} 
        />
      )}
    </section>
  );
};

export default Grounds;
