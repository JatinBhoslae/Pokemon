import React from "react";
import "./GroundModal.css";

const GroundModal = ({ ground, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format effects for display
  const formatEffects = (effects) => {
    const effectItems = [];

    for (const [key, value] of Object.entries(effects)) {
      let displayKey = key.replace(/_/g, " ");
      displayKey = displayKey.charAt(0).toUpperCase() + displayKey.slice(1);

      if (typeof value === "boolean") {
        effectItems.push(`${displayKey}: ${value ? "Yes" : "No"}`);
      } else if (Array.isArray(value)) {
        effectItems.push(`${displayKey}: ${value.join(", ")}`);
      } else {
        effectItems.push(`${displayKey}: ${value}`);
      }
    }

    return effectItems;
  };

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
                ground.image ||
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              }
              alt={ground.name}
              className="modal-image"
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #
              {String(ground.id)
                .replace(/[^0-9]/g, "")
                .padStart(3, "0") || "000"}
            </span>{" "}
            {ground.name}
          </h2>
          <div className="modal-types">
            <span className="type-badge type-normal">{ground.type}</span>
          </div>
        </div>

        <div className="modal-body">
          <h3>Description</h3>
          <p className="description-text">
            {ground.description ||
              `Battle field effect: ${ground.type} with special properties that affect battles.`}
          </p>

          <h3>Ground Details</h3>
          <div className="trainer-details">
            <p>
              <strong>Type:</strong> {ground.type}
            </p>
            <p>
              <strong>ID:</strong> {ground.id}
            </p>
          </div>

          <h3>Effects</h3>
          <div className="effects-container">
            {ground.effects ? (
              formatEffects(ground.effects).map((effect, index) => (
                <div key={index} className="effect-badge">
                  {effect}
                </div>
              ))
            ) : (
              <p>No specific effects defined.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundModal;
