import React, { useState, useEffect } from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import PokemonLeagueModal from "../components/PokemonLeagueModal";

const PokemonLeague = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await import("../data/pokemon_league.json");
        const data = response.default || response;
        const allLeagues = data.pokemon_anime_leagues || [];
        setLeagues(allLeagues);
        setLoading(false);
      } catch (error) {
        console.error("Error loading league data:", error);
        setLeagues([]);
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // Filter all leagues based on search term
  const searchLeagues = leagues.filter(league =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="container">
        <header>
          <h1>Leagues</h1>
        </header>
        <div className="loading-container">
          <h2 className="loading-msg">Loading Leagues...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Leagues</h1>
      </header>

      <div className="content-area">
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Leagues"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          <ul className="cards">
            {searchLeagues.map((league) => (
              <li 
                key={league.id} 
                className="pokemon-card"
                onClick={() => setSelectedLeague(league)}
                style={{ cursor: "pointer" }}
              >
                <span className="pokemon-id">#{String(league.id).padStart(3, "0")}</span>
                <div className="card-overlay-icon">
                  <FaExpandArrowsAlt />
                </div>
                <figure>
                  <img
                    src={league.imageUrl}
                    alt={league.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </figure>
                <h1 className="pokemon-name">{league.name}</h1>
                <div className="pokemon-highlight">
                  <p>{league.region}</p>
                </div>
              </li>
            ))}
          </ul>
          {searchLeagues.length === 0 && (
            <div className="no-results">
              {searchTerm ? "No leagues found matching your search." : "No leagues found."}
            </div>
          )}
        </div>
      {selectedLeague && (
        <PokemonLeagueModal 
          league={selectedLeague} 
          onClose={() => setSelectedLeague(null)} 
        />
      )}
    </section>
  );
};

export default PokemonLeague;