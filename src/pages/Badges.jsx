import React, { useState, useEffect } from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import BadgeSidebar from "../components/BadgeSidebar";
import BadgeModal from "../components/BadgeModal";

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "All",
    category: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await import("../data/badge.json");
        const data = response.default || response;
        const allBadges = data.regions.flatMap(region => 
          region.badges.map(badge => ({
            ...badge,
            region: region.name,
            regionId: region.id
          }))
        );
        setBadges(allBadges);
        setLoading(false);
      } catch (error) {
        console.error("Error loading badge data:", error);
        setBadges([]);
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  // Function to get badges based on selected category
  const getBadgesByCategory = (category) => {
    if (category.id === 0) return badges; // All

    switch(category.category) {
      case "kanto":
        return badges.filter(badge => badge.regionId === "kanto");
      case "orange":
        return badges.filter(badge => badge.regionId === "orange");
      case "johto":
        return badges.filter(badge => badge.regionId === "johto");
      case "hoenn":
        return badges.filter(badge => badge.regionId === "hoenn");
      case "sinnoh":
        return badges.filter(badge => badge.regionId === "sinnoh");
      case "unova":
        return badges.filter(badge => badge.regionId === "unova");
      case "kalos":
        return badges.filter(badge => badge.regionId === "kalos");
      case "alola":
        return badges.filter(badge => badge.regionId === "alola");
      default:
        return badges;
    }
  };

  // Get badges based on selected category
  const filteredBadges = getBadgesByCategory(selectedCategory);
  
  const searchBadges = filteredBadges.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="container">
        <header>
          <h1>Badges</h1>
        </header>
        <div className="loading-container">
          <h2 className="loading-msg">Loading Badges...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Badges</h1>
      </header>

      <div className="main-layout">
        <BadgeSidebar
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={setSelectedCategory}
        />

        <div className="content-area">
          <div className="pokemon-search">
            <input
              type="text"
              placeholder="Search Badges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="cards">
            {searchBadges.map((badge) => (
              <li 
                key={`${badge.regionId}-${badge.name}`} 
                className="pokemon-card"
                onClick={() => setSelectedBadge(badge)}
                style={{ cursor: "pointer" }}
              >
                <span className="pokemon-id">#{String(badge.id || searchBadges.indexOf(badge) + 1).padStart(3, "0")}</span>
                <div className="card-overlay-icon">
                  <FaExpandArrowsAlt />
                </div>
                <figure>
                  <img
                    src={
                      badge.imageUrl ||
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    }
                    alt={badge.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </figure>
                <h1 className="pokemon-name">{badge.name}</h1>
                <div className="pokemon-highlight">
                  <p>{badge.gymType}</p>
                </div>
              </li>
            ))}
          </ul>
          {searchBadges.length === 0 && (
            <div className="no-results">
              {searchTerm ? "No badges found matching your search." : "No badges found for the selected category."}
            </div>
          )}
        </div>
      </div>
      {selectedBadge && (
        <BadgeModal 
          badge={selectedBadge} 
          onClose={() => setSelectedBadge(null)} 
        />
      )}
    </section>
  );
};

export default Badges;