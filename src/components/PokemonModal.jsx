import React, { useEffect, useState } from "react";
import "./PokemonModal.css";
import { MdCatchingPokemon } from "react-icons/md";

export default function PokemonModal({ pokemon, onClose }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackType, setAttackType] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
        );
        const data = await res.json();
        const englishEntry = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setDescription(
          englishEntry
            ? englishEntry.flavor_text.replace(/[\f\n\r]/g, " ")
            : "No description available."
        );
      } catch (error) {
        console.error("Failed to fetch description", error);
        setDescription("Failed to load description.");
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [pokemon.id]);

  // Close on outside click
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  const handleAttack = (moveName) => {
    if (isAttacking) return; // Prevent spamming
    setIsAttacking(true);

    // Speak Pokemon Name (Anime Style)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(pokemon.name);
      // Adjust voice characteristics to sound more "anime/creature-like"
      utterance.pitch = 1.5; // Higher pitch
      utterance.rate = 1.2; // Slightly faster
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } else if (pokemon.cries && pokemon.cries.latest) {
      // Fallback to game cry if TTS not supported
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.5;
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }

    // Determine attack type based on move name
    const lowerMove = moveName.toLowerCase();
    if (
      lowerMove.includes("solar") ||
      lowerMove.includes("leaf") ||
      lowerMove.includes("grass") ||
      lowerMove.includes("whip") ||
      lowerMove.includes("razor") ||
      lowerMove.includes("seed")
    ) {
      setAttackType("grass");
    } else if (
      lowerMove.includes("fire") ||
      lowerMove.includes("flame") ||
      lowerMove.includes("ember") ||
      lowerMove.includes("heat") ||
      lowerMove.includes("burn") ||
      lowerMove.includes("blaze")
    ) {
      setAttackType("fire");
    } else if (
      lowerMove.includes("water") ||
      lowerMove.includes("hydro") ||
      lowerMove.includes("bubble") ||
      lowerMove.includes("rain") ||
      lowerMove.includes("splash") ||
      lowerMove.includes("surf") ||
      lowerMove.includes("pump")
    ) {
      setAttackType("water");
    } else if (
      lowerMove.includes("thunder") ||
      lowerMove.includes("bolt") ||
      lowerMove.includes("spark") ||
      lowerMove.includes("shock") ||
      lowerMove.includes("volt") ||
      lowerMove.includes("zap")
    ) {
      setAttackType("electric");
    } else {
      setAttackType("normal");
    }

    // Animation duration: 2 seconds
    setTimeout(() => {
      setIsAttacking(false);
      setAttackType("");
    }, 2000);
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
                pokemon.sprites.other.dream_world.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className={`modal-image ${isAttacking ? "attacking" : ""}`}
            />
            {isAttacking && (
              <div className={`attack-effect effect-${attackType}`}>
                <span className="particle p1"></span>
                <span className="particle p2"></span>
                <span className="particle p3"></span>
                <span className="particle p4"></span>
              </div>
            )}
          </div>
          <h2 className="modal-title">
            <span className="modal-id">
              #{String(pokemon.id).padStart(3, "0")}
            </span>{" "}
            {pokemon.name}
          </h2>
          <div className="modal-types">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`type-badge type-${t.type.name}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-body">
          <h3>Description</h3>
          <p className="description-text">
            {loading ? "Loading description..." : description}
          </p>

          <h3>Stats</h3>
          <div className="stats-container">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-row">
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  ></div>
                </div>
                <span style={{ marginLeft: "1rem", fontSize: "1.4rem" }}>
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>

          <h3>Abilities</h3>
          <p style={{ fontSize: "1.6rem", textTransform: "capitalize" }}>
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>

          <h3>
            Moves - <span>For sound and attack press any button</span>
          </h3>
          <div className="moves-grid">
            {pokemon.moves.slice(0, 20).map((moveInfo) => (
              <button
                key={moveInfo.move.name}
                className="move-badge"
                onClick={() => handleAttack(moveInfo.move.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <MdCatchingPokemon />
                {moveInfo.move.name.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
