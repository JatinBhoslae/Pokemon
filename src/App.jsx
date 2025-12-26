import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "./pages/Pokemon";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Trainers from "./pages/Trainers";
import Supporters from "./pages/Supporters";
import Grounds from "./pages/Grounds";
import PokemonLeague from "./pages/PokemonLeague";
import Badges from "./pages/Badges";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Pokemon />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/supporters" element={<Supporters />} />
            <Route path="/grounds" element={<Grounds />} />
            <Route path="/leagues" element={<PokemonLeague />} />
            <Route path="/badges" element={<Badges />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
