import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

const mockHero = {
  id: '1',
  name: 'Superman',
}

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } = use( FavoriteHeroContext );
  return (
    <div>
      <p data-testid = "favoriteCount">{favoriteCount}</p>
      <div data-testid="favorites-list">
        {
          favorites.map( hero => (
            <div key={hero.id} data-testid={`favorite-hero-${hero.id}`}>
              {hero.name}
            </div>
          ))
        }
      </div>
      <button data-testid="toggle-favorite" onClick={() => toggleFavorite(mockHero)}>Toggle Favorite</button>
      <div className="" data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
}

const renderTestComponent = () => {
  return render(<FavoriteHeroProvider children={<TestComponent />} />);
}

describe('FavoriteHeroContext.test', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // test( 'should initialize with default values', () => {
  //   renderTestComponent();
  //   expect( screen.getByTestId('favoriteCount').textContent ).toBe('0');
  //   expect( screen.queryByTestId('favorites-list')?.children.length ).toBe(0);
  // });


  // test( 'should add hero to favorites when toggle favorite is new', () => {
  //   renderTestComponent();
  //   const toggleFavoriteButton = screen.getByTestId('toggle-favorite');
  //   fireEvent.click( toggleFavoriteButton );
  //   expect( screen.getByTestId('favoriteCount').textContent ).toBe('1');
  //   expect( screen.getByTestId('is-favorite').textContent ).toBe('true');
  //   expect( screen.getByTestId('favorites-list').children.length ).toBeGreaterThan(0);
  //   const dataLocalStorage: Hero[] = JSON.parse( localStorage.getItem('favorites') as string );
  //   expect( dataLocalStorage.length ).toBeGreaterThan(0);

  // });
  
  test( 'should remove hero from favorites when toggle favorite is not new', () => {
    localStorage.setItem('favorites', JSON.stringify([ mockHero ]));
    
    renderTestComponent();

    const toggleFavoriteButton = screen.getByTestId('toggle-favorite');
    fireEvent.click( toggleFavoriteButton );

    expect( screen.getByTestId('favoriteCount').textContent ).toBe('0');
    expect( screen.getByTestId('is-favorite').textContent ).toBe('false');
    expect( screen.queryByTestId('favorites-list')?.children.length ).toBe(0);
    expect( screen.queryByTestId('favorite-hero-1')?.textContent ?? null ).toBeNull();
    const dataLocalStorage: Hero[] = JSON.parse( localStorage.getItem('favorites') as string );
    expect( dataLocalStorage.length ).toBe(0);
  });
});