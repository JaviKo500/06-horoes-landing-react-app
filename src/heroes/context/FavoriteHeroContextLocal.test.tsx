import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { beforeEach } from "node:test";

const mockHero = {
  id: '1',
  name: 'Superman',
};

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}


Object.defineProperty( window, 'localStorage', {
  value: localStorageMock,
});

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

describe('FavoriteHeroContextLocal.test', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test( 'should initialize with default values', () => {
    renderTestComponent();

    expect( screen.getByTestId('favoriteCount').textContent ).toBe('0');
    expect( screen.queryByTestId('favorites-list')?.children.length ).toBe(0);
    expect( localStorageMock.setItem ).toHaveBeenCalled();
    expect( localStorageMock.setItem ).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([])
    );
  });


  // test( 'should add hero to favorites when toggle favorite is new', () => {
  //   renderTestComponent();
  //   localStorageMock.setItem.mockReturnValue(JSON.stringify([ mockHero ]));
  //   const toggleFavoriteButton = screen.getByTestId('toggle-favorite');
  //   fireEvent.click( toggleFavoriteButton );
  //   expect( screen.getByTestId('favoriteCount').textContent ).toBe('1');
  //   expect( screen.getByTestId('is-favorite').textContent ).toBe('true');
  //   expect( screen.getByTestId('favorites-list').children.length ).toBeGreaterThan(0);
  //   const dataLocalStorage: Hero[] = JSON.parse( localStorage.getItem('favorites') as string );
  //   expect( dataLocalStorage.length ).toBeGreaterThan(0);

  // });
  
  test( 'should remove hero from favorites when toggle favorite is not new', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([ mockHero ]));
    renderTestComponent();

    const toggleFavoriteButton = screen.getByTestId('toggle-favorite');
    fireEvent.click( toggleFavoriteButton );

    expect( screen.getByTestId('favoriteCount').textContent ).toBe('0');
    expect( screen.getByTestId('is-favorite').textContent ).toBe('false');
    expect( screen.queryByTestId('favorites-list')?.children.length ).toBe(0);
    expect( screen.queryByTestId('favorite-hero-1')?.textContent ?? null ).toBeNull();
    // const dataLocalStorage: Hero[] = JSON.parse( localStorageMock.getItem('favorites') as string );
    // expect( dataLocalStorage.length ).toBe(0);
  });
});