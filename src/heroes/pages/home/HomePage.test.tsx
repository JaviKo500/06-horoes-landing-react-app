import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginationHeroes } from "../hooks/usePaginationHeroes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('../hooks/usePaginationHeroes');

const mockUsePaginationHeroes = vi.mocked(usePaginationHeroes);

mockUsePaginationHeroes.mockReturnValue({
  data: {
    heroes: [],
    total: 0,
    pages: 0,
  } ,
  isLoading: false,
  isError: false,
  isSuccess: true,
  error: null,
} as unknown as ReturnType< typeof mockUsePaginationHeroes > ) ;

const queryClient = new QueryClient();

const renderHomePage = ( initialEntries?: string[] ) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} >
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  )
}

describe('HomePage.test', () => {

  beforeEach(() => {
    mockUsePaginationHeroes.mockClear();
  });

  test( 'should render home page with default props', () => {
    const { container } =  renderHomePage();
    expect( container ).toMatchSnapshot();
  });

  test( 'should call usePaginationHero with default values', () => {
    renderHomePage();
    expect( mockUsePaginationHeroes ).toHaveBeenCalledWith({
      "category": "all",
      "limit": 6,
      "page": 1,
    });
  });

  test( 'should call usePaginationHero with custom query params', () => {
    renderHomePage([ '/?page=2&limit=12&category=hero' ]);
    expect( mockUsePaginationHeroes ).toHaveBeenCalledWith({
      "category": "hero",
      "limit": 12,
      "page": 2,
    });
  });

  test( 'should call usePaginationHero with default and same limit on tab change', () => {
    renderHomePage([ '/?tab=favorites&page=2&limit=10' ]);
    const [ , , , villainsTab ] = screen.getAllByRole('tab');

    fireEvent.click( villainsTab );

    expect( mockUsePaginationHeroes ).toHaveBeenCalledWith({
      "category": "villain",
      "limit": 10,
      "page": 1,
    });
  });
});