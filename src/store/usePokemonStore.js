import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePokemonStore = create(
  persist(
    (set, get) => ({
      favoritePokemon: [], // Array of { name, url }
      
      toggleFavorite: (pokemon) => {
        const currentFavorites = get().favoritePokemon;
        const isFav = currentFavorites.some(p => p.name === pokemon.name);
        
        if (isFav) {
          set({ favoritePokemon: currentFavorites.filter(p => p.name !== pokemon.name) });
        } else {
          set({ favoritePokemon: [...currentFavorites, { name: pokemon.name, url: pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/` }] });
        }
      },
      
      isFavorite: (pokemonName) => {
        return get().favoritePokemon.some(p => p.name === pokemonName);
      }
    }),
    {
      name: 'pokemon-favorites-storage', // key in localStorage
    }
  )
);
