import React, { useState, useEffect } from 'react';
import { queuedFetch } from '../utils/fetchQueue';

const FallbackImage = ({ src, alt, query, defaultFallback, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const isPikachu = src === "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
    if (isPikachu && query) {
      handleError();
    } else {
      setCurrentSrc(src);
      setHasError(false); // Reset error state if the source changes
    }
  }, [src, query]);

  const handleError = async () => {
    if (hasError) return; // Prevent infinite loops
    setHasError(true);

    if (!query) {
      setCurrentSrc(defaultFallback || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
      return;
    }

    // 1. Try TCGdex API
    try {
      const tcgdexData = await queuedFetch(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(query)}`);
      if (tcgdexData && tcgdexData.length > 0 && tcgdexData[0].image) {
        setCurrentSrc(`${tcgdexData[0].image}/high.webp`);
        return;
      }
    } catch (e) {
      console.warn("TCGDex fallback failed", e);
    }

    // 2. Try Pokemon TCG API
    try {
      const tcgData = await queuedFetch(`https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(query)}"`);
      if (tcgData && tcgData.data && tcgData.data.length > 0) {
        setCurrentSrc(tcgData.data[0].images.large || tcgData.data[0].images.small);
        return;
      }
    } catch (e) {
      console.warn("Pokemon TCG fallback failed", e);
    }

    // 3. Fallback to default if everything fails
    setCurrentSrc(defaultFallback || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
  };

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      onError={handleError}
      {...props} 
    />
  );
};

export default FallbackImage;
