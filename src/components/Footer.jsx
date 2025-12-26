import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About This Project</h3>
          <p>
            This is a fan project created for educational purposes. All Pokémon
            content is trademarked by Nintendo, Game Freak & The Pokémon
            Company.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Pokémon</a>
            </li>
            <li>
              <a href="/trainers">Trainers</a>
            </li>
            <li>
              <a href="/supporters">Supporters</a>
            </li>
            <li>
              <a href="/grounds">Grounds</a>
            </li>
            <li>
              <a href="/leagues">Leagues</a>
            </li>
            <li>
              <a href="/badges">Badges</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Developer: Jatin Bhosale</p>
          <p>Email: jatinbhosale428@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Pokémon © Nintendo, Game Freak & The Pokémon Company — fan project,
          educational use only. Sources: Bulbapedia & Pokémon Fandom.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
