import React, { useState, useEffect } from "react";
import "../index.css";
import { FaExpandArrowsAlt } from "react-icons/fa";
import TrainerModal from "../components/TrainerModal";
import TrainerSidebar from "../components/TrainerSidebar";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "All",
    category: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        // Dynamically import all trainer data files
        const [
          kantoData,
          johtoData,
          hoennData,
          sinnohData,
          unovaData,
          kalosData,
          alolaData,
          galarData,
          paldeaData,
          championsData,
          rivalsData,
          villainsData,
        ] = await Promise.all([
          import("../data/trainers/kanto.json").then(
            (module) => module.default
          ),
          import("../data/trainers/johto.json").then(
            (module) => module.default
          ),
          import("../data/trainers/hoenn.json").then(
            (module) => module.default
          ),
          import("../data/trainers/sinnoh.json").then(
            (module) => module.default
          ),
          import("../data/trainers/unova.json").then(
            (module) => module.default
          ),
          import("../data/trainers/kalos.json").then(
            (module) => module.default
          ),
          import("../data/trainers/alola.json").then(
            (module) => module.default
          ),
          import("../data/trainers/galar.json").then(
            (module) => module.default
          ),
          import("../data/trainers/paldea.json").then(
            (module) => module.default
          ),
          import("../data/trainers/champions.json").then(
            (module) => module.default
          ),
          import("../data/trainers/rivals.json").then(
            (module) => module.default
          ),
          import("../data/trainers/villains.json").then(
            (module) => module.default
          ),
        ]);

        // Combine all data
        const allTrainers = [
          ...kantoData,
          ...johtoData,
          ...hoennData,
          ...sinnohData,
          ...unovaData,
          ...kalosData,
          ...alolaData,
          ...galarData,
          ...paldeaData,
          ...championsData,
          ...rivalsData,
          ...villainsData,
        ];

        setTrainers(allTrainers);
        setLoading(false);
      } catch (error) {
        console.error("Error loading trainer data:", error);
        // Fallback to empty array if there's an error
        setTrainers([]);
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Function to get trainers based on selected category
  const getTrainersByCategory = (category) => {
    if (category.id === 0) return trainers; // All

    switch (category.category) {
      case "kanto":
        return trainers.filter((trainer) => trainer.region === "kanto");
      case "johto":
        return trainers.filter((trainer) => trainer.region === "johto");
      case "hoenn":
        return trainers.filter((trainer) => trainer.region === "hoenn");
      case "sinnoh":
        return trainers.filter((trainer) => trainer.region === "sinnoh");
      case "unova":
        return trainers.filter((trainer) => trainer.region === "unova");
      case "kalos":
        return trainers.filter((trainer) => trainer.region === "kalos");
      case "alola":
        return trainers.filter((trainer) => trainer.region === "alola");
      case "galar":
        return trainers.filter((trainer) => trainer.region === "galar");
      case "paldea":
        return trainers.filter((trainer) => trainer.region === "paldea");
      case "champions":
        return trainers.filter(
          (trainer) =>
            trainer.role.toLowerCase().includes("champion") ||
            trainer.trainerClass.toLowerCase().includes("champion")
        );
      case "rivals":
        return trainers.filter(
          (trainer) =>
            trainer.role.toLowerCase().includes("rival") ||
            trainer.trainerClass.toLowerCase().includes("rival")
        );
      case "villains":
        return trainers.filter(
          (trainer) =>
            trainer.role.toLowerCase().includes("villain") ||
            trainer.trainerClass.toLowerCase().includes("villain") ||
            trainer.trainerClass.toLowerCase().includes("team")
        );
      default:
        return trainers;
    }
  };

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
  };

  const closeModal = () => {
    setSelectedTrainer(null);
  };

  // Get trainers based on selected category and search term
  const filteredTrainers = getTrainersByCategory(selectedCategory);
  
  const searchTrainers = filteredTrainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="container">
        <header>
          <h1>Trainers</h1>
        </header>
        <div className="loading-container">
          <h2 className="loading-msg">Loading Trainers...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Trainers</h1>
      </header>

      <div className="main-layout">
        <TrainerSidebar
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={setSelectedCategory}
        />

        <div className="content-area">
          <div className="pokemon-search">
            <input
              type="text"
              placeholder="Search Trainers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="cards">
            {searchTrainers.map((trainer) => (
              <li 
                key={trainer.id} 
                className="pokemon-card"
                onClick={() => setSelectedTrainer(trainer)}
                style={{ cursor: "pointer" }}
              >
                <span className="pokemon-id">#{String(trainer.id).padStart(3, "0")}</span>
                <div className="card-overlay-icon">
                  <FaExpandArrowsAlt />
                </div>
                <figure>
                  <img
                    src={
                      trainer.trainerPhoto ||
                      trainer.trainerSprite ||
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    }
                    alt={trainer.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </figure>
                <h1 className="pokemon-name">{trainer.name}</h1>
                <div className="pokemon-highlight">
                  <p>{trainer.role}</p>
                </div>
              </li>
            ))}
          </ul>
          {searchTrainers.length === 0 && (
            <div className="no-results">
              {searchTerm ? "No trainers found matching your search." : "No trainers found for the selected category."}
            </div>
          )}
        </div>
      </div>
      {selectedTrainer && (
        <TrainerModal 
          trainer={selectedTrainer} 
          onClose={() => setSelectedTrainer(null)} 
        />
      )}
    </section>
  );
};

export default Trainers;
