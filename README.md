# Pokémon Lover Hub ⚡

A comprehensive React application dedicated to the Pokémon universe! This app lets you explore Pokémon generations, discover trainers across regions, and dive into the details of badges, battle grounds, and leagues. 

## 🌟 Features

- **Pokémon Directory:** Browse through every Pokémon generation. Displays detailed information including sprites, flavor text, and more.
- **Trainers & Supporters:** A complete database of gym leaders, elite four, champions, rivals, and villains. Includes an intelligent TCG (Trading Card Game) image fallback system.
- **Gym Badges & Leagues:** View all region badges, gym types, and league maps.
- **Battle Grounds:** Inspect various battle terrains, weather conditions, and special field effects.
- **Smart Image Loading:** Features a custom network request queue (`fetchQueue.js`) that efficiently pulls trading card images from TCGdex and Pokémon TCG APIs for missing character sprites without crashing the browser's network limit.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Custom Vanilla CSS & CSS Modules (Tailwind dependencies installed for future scalability)
- **Icons:** React Icons
- **APIs Used:**
  - [PokéAPI](https://pokeapi.co/)
  - [TCGdex API](https://tcgdex.dev/)
  - [Pokémon TCG API](https://pokemontcg.io/)

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## 📈 Future Upgrade Opportunities

If you're looking to scale this project further, here are a few recommended upgrades:

1. **Implement React Query (TanStack Query):**
   Currently, the app relies on a custom `fetchQueue` and standard `useEffect` hooks. Upgrading to TanStack query would provide out-of-the-box caching, background refetching, and better loading/error state management.

2. **Add Virtualization / Infinite Scroll:**
   The "All" category fetches 1300+ Pokémon at once. Implementing infinite scrolling (via Intersection Observer) or list virtualization (via `react-window`) would massively improve rendering performance.

3. **Migrate to TypeScript:**
   Given the complexity of the Pokémon data structures, migrating `.jsx` files to `.tsx` would provide strong type safety, better autocomplete, and catch bugs earlier.

4. **Fully Integrate Tailwind CSS:**
   Although Tailwind is listed in the `package.json`, the app currently uses standard CSS files (`index.css`, `GroundModal.css`, etc). Transitioning fully to Tailwind utility classes would speed up UI development and make styling more consistent.

5. **Global State Management:**
   If you plan to add user accounts (e.g., "Favorite Pokémon" lists or "Team Builders"), consider adding **Zustand** or **Redux Toolkit** to manage that global state across pages.
