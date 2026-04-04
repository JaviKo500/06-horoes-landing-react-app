import { createContext, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // * State
  favorites: Hero[];
  favoriteCount: number;

  // * Methods
  toggleFavorite: (hero: Hero) => void;
  isFavorite: (hero: Hero) => boolean;
}

const FavoriteHeroContext = createContext<FavoriteHeroContext>({} as FavoriteHeroContext);

export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {
  const [ favorites, setFavorites ] = useState<Hero[]>([]);

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find( h => h.id === hero.id );
    if ( heroExist ) {
      setFavorites( favorites.filter( h => h.id !== hero.id ) );
      return;
    }
    setFavorites([ ...favorites, hero ]);
  }

  const isFavorite = (hero: Hero) => {
    return favorites.find( h => h.id === hero.id ) ? true : false;
  }

  return (
    <FavoriteHeroContext
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite
      }} 
    >
      {children}
    </FavoriteHeroContext>
  );
}
