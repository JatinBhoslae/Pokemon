import React, { useState, useEffect } from "react";
import "../index.css";
import { FaExpandArrowsAlt } from "react-icons/fa";
import SupporterModal from "../components/SupporterModal";

export default function Supporters() {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupporter, setSelectedSupporter] = useState(null);
  
  useEffect(() => {
    // Using sample data since the Pokémon TCG API requires server-side access
    const sampleSupporters = [
      { id: "sm11-123", name: "Professor Oak", supertype: "Trainer", subtypes: ["Supporter"], text: ["Discard your hand and draw 7 cards."], images: { small: "https://images.pokemontcg.io/sm11/123.png" } },
      { id: "swsh35-124", name: "Bill", supertype: "Trainer", subtypes: ["Supporter"], text: ["Draw 2 cards."], images: { small: "https://images.pokemontcg.io/swsh35/124.png" } },
      { id: "base1-125", name: "Erika", supertype: "Trainer", subtypes: ["Supporter"], text: ["Heal 50 damage from one of your Pokemon."], images: { small: "https://images.pokemontcg.io/base1/125.png" } },
      { id: "dp1-126", name: "Giovanni", supertype: "Trainer", subtypes: ["Supporter"], text: ["Choose 1 of your opponent's Active Pokemon."], images: { small: "https://images.pokemontcg.io/dp1/126.png" } },
      { id: "basep-127", name: "Poke Ball", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Pokemon, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/basep/127.png" } },
      { id: "gym1-128", name: "Gym Challenge", supertype: "Trainer", subtypes: ["Supporter"], text: ["Draw cards until you have 6 cards in your hand."], images: { small: "https://images.pokemontcg.io/gym1/128.png" } },
      { id: "neo1-129", name: "Energy Retrieval", supertype: "Trainer", subtypes: ["Supporter"], text: ["Return 2 Energy cards from your discard pile to your hand."], images: { small: "https://images.pokemontcg.io/neo1/129.png" } },
      { id: "base4-130", name: "Item Finder", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your discard pile for 2 Trainer cards, show them, and put them into your hand."], images: { small: "https://images.pokemontcg.io/base4/130.png" } },
      { id: "sm3-131", name: "Nest Ball", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Pokemon with 60 HP or less, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/sm3/131.png" } },
      { id: "swsh11-132", name: "Poke Ball", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Pokemon, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/swsh11/132.png" } },
      { id: "swsh45-133", name: "Professor Sycamore", supertype: "Trainer", subtypes: ["Supporter"], text: ["Discard your hand and draw 7 cards."], images: { small: "https://images.pokemontcg.io/swsh45/133.png" } },
      { id: "swsh9-134", name: "Poke Center Lady", supertype: "Trainer", subtypes: ["Supporter"], text: ["Heal all of your Pokemon."], images: { small: "https://images.pokemontcg.io/swsh9/134.png" } },
      { id: "swshp-SWSH001", name: "Poke Ball", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Pokemon, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/swshp/SWSH001.png" } },
      { id: "base3-135", name: "Computer Maniac", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Technical Machine card, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/base3/135.png" } },
      { id: "base6-136", name: "Poke Flute", supertype: "Trainer", subtypes: ["Supporter"], text: ["Flip a coin. If heads, choose 1 of your opponent's Asleep, Confused, or Paralyzed Pokemon and remove that Special Condition."], images: { small: "https://images.pokemontcg.io/base6/136.png" } },
      { id: "base5-137", name: "Lass", supertype: "Trainer", subtypes: ["Supporter"], text: ["You can play only 1 Supporter card during your turn (before your attack)."], images: { small: "https://images.pokemontcg.io/base5/137.png" } },
      { id: "sm12-138", name: "Hala", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for up to 2 Basic Fighting Pokemon, show them, and put them into your hand. Then, shuffle your deck."], images: { small: "https://images.pokemontcg.io/sm12/138.png" } },
      { id: "swsh3-139", name: "Raihan", supertype: "Trainer", subtypes: ["Supporter"], text: ["Search your deck for a Dragon-type Pokemon, show it, and put it into your hand."], images: { small: "https://images.pokemontcg.io/swsh3/139.png" } },
      { id: "swsh4-140", name: "Roxie", supertype: "Trainer", subtypes: ["Supporter"], text: ["Discard a card from your hand. If you do, your opponent discards a random card from their hand."], images: { small: "https://images.pokemontcg.io/swsh4/140.png" } },
      { id: "swsh6-141", name: "Hop", supertype: "Trainer", subtypes: ["Supporter"], text: ["Draw 3 cards."], images: { small: "https://images.pokemontcg.io/swsh6/141.png" } },
      { id: "swsh10-142", name: "Leon", supertype: "Trainer", subtypes: ["Supporter"], text: ["Draw 3 cards. Then, your opponent draws 2 cards."], images: { small: "https://images.pokemontcg.io/swsh10/142.png" } },
    ];
    
    setSupporters(sampleSupporters);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  
  const filteredSupporters = supporters.filter(supporter =>
    supporter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="container">
        <header>
          <h1>Supporter Cards</h1>
        </header>
        <div className="loading">Loading Supporters...</div>
      </section>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Supporter Cards</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Supporters"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
          <ul className="cards">
            {filteredSupporters.map((card) => (
              <li 
                key={card.id} 
                className="pokemon-card"
                onClick={() => setSelectedSupporter(card)}
                style={{ cursor: "pointer" }}
              >
                <span className="pokemon-id">#{card.id}</span>
                <div className="card-overlay-icon">
                  <FaExpandArrowsAlt />
                </div>
                <figure>
                  <img
                    src={card.images?.small || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/professors-mask.png"}
                    alt={card.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </figure>
                <h1 className="pokemon-name">{card.name}</h1>
                <div className="pokemon-highlight">
                  <p>{card.supertype}</p>
                </div>
              </li>
            ))}
          </ul>
          {filteredSupporters.length === 0 && (
            <div className="no-results">
              {searchTerm ? "No supporters found matching your search." : "No supporters found."}
            </div>
          )}
          
          {selectedSupporter && (
            <SupporterModal 
              supporter={selectedSupporter} 
              onClose={() => setSelectedSupporter(null)} 
            />
          )}
    </section>
  );
}
