import React from "react";
import "./PokemonModal.css";

const SupporterModal = ({ supporter, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  if (!supporter) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <div className="image-container">
            <img
              src={supporter.images?.large || supporter.images?.small || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/professors-mask.png"}
              alt={supporter.name}
              className="modal-image"
            />
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #{supporter.id}
            </span>{" "}
            {supporter.name}
          </h2>
          <div className="modal-types">
            <span className="type-badge type-normal">
              {supporter.supertype}
            </span>
            {supporter.subtypes && supporter.subtypes.map((subtype, index) => (
              <span key={index} className="type-badge type-normal">
                {subtype}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-body">
          <h3>Card Information</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem"}}>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Name</strong>
              <div className="type-badge type-normal" style={{background: "#3498db", fontSize: "1.2rem"}}>
                {supporter.name}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Supertype</strong>
              <div className="type-badge type-normal" style={{background: "#e74c3c", fontSize: "1.2rem"}}>
                {supporter.supertype}
              </div>
            </div>
            <div>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Subtype</strong>
              <div className="type-badge type-normal" style={{background: "#9b59b6", fontSize: "1.2rem"}}>
                {supporter.subtypes ? supporter.subtypes.join(", ") : "N/A"}
              </div>
            </div>
            <div style={{gridColumn: "1 / -1"}}>
              <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Rarity</strong>
              <div className="type-badge type-normal" style={{background: "#2ecc71", fontSize: "1.2rem"}}>
                {supporter.rarity || "N/A"}
              </div>
            </div>
          </div>

          {supporter.text && supporter.text.length > 0 && (
            <>
              <h3>Effect</h3>
              <div className="description-text">
                {supporter.text.join(" ")}
              </div>
            </>
          )}

          {supporter.set && (
            <>
              <h3>Set Information</h3>
              <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem"}}>
                <div>
                  <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Set Name</strong>
                  <div className="type-badge type-normal" style={{background: "#f39c12", fontSize: "1.2rem"}}>
                    {supporter.set.name}
                  </div>
                </div>
                <div>
                  <strong style={{display: "block", marginBottom: "0.5rem", fontSize: "1.4rem"}}>Set Series</strong>
                  <div className="type-badge type-normal" style={{background: "#e67e22", fontSize: "1.2rem"}}>
                    {supporter.set.series}
                  </div>
                </div>
              </div>
            </>
          )}

          {supporter.ability && (
            <>
              <h3>Ability</h3>
              <div className="description-text">
                <strong>{supporter.ability.name}:</strong> {supporter.ability.text}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupporterModal;