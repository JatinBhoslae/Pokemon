import React from "react";
import "./PokemonModal.css";

const BadgeModal = ({ badge, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  if (!badge) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <div className="image-container">
            <img
              src={badge.imageUrl}
              alt={badge.name}
              className="modal-image"
            />
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #{String(badge.id || 1).padStart(3, "0")}
            </span>{" "}
            {badge.name}
          </h2>
          <div className="modal-types">
            <span className="type-badge type-normal">
              {badge.gymType}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <h3>Badge Information</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem"}}>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Given By</strong>
              <div className="type-badge type-normal" style={{background: "#3498db", fontSize: "1.2rem"}}>
                {badge.givenBy}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Region</strong>
              <div className="type-badge type-normal" style={{background: "#e74c3c", fontSize: "1.2rem"}}>
                {badge.region}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Gym Type</strong>
              <div className="type-badge type-normal" style={{background: "#9b59b6", fontSize: "1.2rem"}}>
                {badge.gymType}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Gym Leader Pokemon</strong>
              <div className="type-badge type-normal" style={{background: "#2ecc71", fontSize: "1.2rem"}}>
                {badge.gymLeaderPokemon.join(", ")}
              </div>
            </div>
          </div>
          {badge.specialEffect && (
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Special Effect</strong>
              <div className="type-badge type-normal" style={{background: "#f39c12", fontSize: "1.2rem"}}>
                {badge.specialEffect}
              </div>
            </div>
          )}
          <h3>Gym Leader Pokemon</h3>
          <div style={{display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0"}}>
            {badge.gymLeaderPokemon.map((pokemon, index) => (
              <div key={index} className="type-badge type-normal" style={{margin: "0.2rem"}}>
                {pokemon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;