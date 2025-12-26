import React, { useState, useEffect } from "react";
import "./PokemonModal.css";
import "./TrainerModal.css";

export default function TrainerModal({ trainer, onClose }) {
  const [detailedTrainer, setDetailedTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the trainer data directly from the props
    // No need to fetch additional data since it's already included in the JSON
    setTimeout(() => {
      setDetailedTrainer(trainer);
      setLoading(false);
    }, 300);
  }, [trainer]);

  // Close on outside click
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="modal-header">
            <h2>Loading trainer details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!detailedTrainer) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <div className="image-container">
            <img
              src={
                detailedTrainer.trainerPhoto ||
                detailedTrainer.trainerSprite ||
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              }
              alt={detailedTrainer.name}
              className="modal-image"
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #{String(detailedTrainer.id).padStart(3, "0")}
            </span>{" "}
            {detailedTrainer.name}
          </h2>
          <div className="modal-types">
            <span className="type-badge type-normal">
              {detailedTrainer.role || detailedTrainer.trainerClass}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <h3>Description</h3>
          <p className="description-text">
            {detailedTrainer.description || "No description available."}
          </p>

          <h3>Trainer Details</h3>
          <div className="trainer-details">
            <p>
              <strong>Region:</strong> {detailedTrainer.region}
            </p>
            <p>
              <strong>Trainer Class:</strong> {detailedTrainer.trainerClass}
            </p>
            <p>
              <strong>Title:</strong> {detailedTrainer.title}
            </p>
          </div>

          <h3>Career History</h3>
          <div className="career-history">
            {(detailedTrainer.careerHistory || []).map((history, index) => (
              <div key={index} className="career-item">
                <h4>
                  {history.position}{" "}
                  <span className="year">({history.year})</span>
                </h4>
                <p>{history.description}</p>
              </div>
            ))}
          </div>

          <h3>Achievements</h3>
          <div className="achievements-container">
            {(detailedTrainer.achievements || []).map((achievement, index) => (
              <div key={index} className="achievement-badge">
                {achievement}
              </div>
            ))}
          </div>

          <h3>Badges</h3>
          <div className="badges-container">
            {(detailedTrainer.gymBadges || []).map((badge, index) => (
              <div key={index} className="badge-item">
                {badge}
              </div>
            ))}
          </div>

          <h3>Championships</h3>
          <div className="championships-container">
            {(detailedTrainer.championships || []).map(
              (championship, index) => (
                <div key={index} className="championship-badge">
                  {championship}
                </div>
              )
            )}
          </div>

          <h3>Notable Battles</h3>
          <div className="battles-container">
            {(detailedTrainer.notableBattles || []).map((battle, index) => (
              <div key={index} className="battle-item">
                {battle}
              </div>
            ))}
          </div>

          <h3>Signature Pokémon</h3>
          <div className="pokemon-caught-grid">
            {(detailedTrainer.signaturePokemon || []).map((pokemon) => (
              <div key={pokemon.id} className="pokemon-caught-item">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  title={`${pokemon.name} (${
                    pokemon.nickname || pokemon.name
                  })`}
                  style={{ width: "60px", height: "60px" }}
                />
                <span>{pokemon.name}</span>
                <small>{pokemon.role}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
