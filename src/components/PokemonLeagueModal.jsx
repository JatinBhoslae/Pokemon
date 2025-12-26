import React from "react";
import "./PokemonModal.css";

const PokemonLeagueModal = ({ league, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  if (!league) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <div className="image-container">
            <img
              src={league.imageUrl}
              alt={league.name}
              className="modal-image"
            />
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #{String(league.id || 1).padStart(3, "0")}
            </span>{" "}
            {league.name}
          </h2>
          <div className="modal-types">
            <span className="type-badge type-normal">
              {league.region}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <h3>League Information</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem"}}>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Region</strong>
              <div className="type-badge type-normal" style={{background: "#3498db", fontSize: "1.2rem"}}>
                {league.region}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Year</strong>
              <div className="type-badge type-normal" style={{background: "#e74c3c", fontSize: "1.2rem"}}>
                {league.year}
              </div>
            </div>
            <div style={{gridColumn: "1 / -1"}}>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Description</strong>
              <div className="type-badge type-normal" style={{background: "#9b59b6", fontSize: "1.2rem"}}>
                {league.description}
              </div>
            </div>
            {league.winner && (
              <div style={{gridColumn: "1 / -1"}}>
                <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Winner</strong>
                <div className="type-badge type-normal" style={{background: "#2ecc71", fontSize: "1.2rem"}}>
                  {league.winner.name} ({league.winner.result})
                </div>
              </div>
            )}
            {league.runnerUp && (
              <div style={{gridColumn: "1 / -1"}}>
                <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Runner Up</strong>
                <div className="type-badge type-normal" style={{background: "#f39c12", fontSize: "1.2rem"}}>
                  {league.runnerUp.name} ({league.runnerUp.result})
                </div>
              </div>
            )}
          </div>
          <h3>Participants</h3>
          <div className="modal-details" style={{display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0"}}>
            {league.participants.map((participant, index) => (
              <div key={index} className="type-badge type-normal" style={{margin: "0.2rem"}}>
                {participant}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonLeagueModal;