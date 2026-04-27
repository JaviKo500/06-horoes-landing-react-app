import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from '../../types/hero.interface';

vi.mock('../../actions/search-heroes.action');
vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: ( ) => <div>CustomJumbotron</div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ( {heroes}: {heroes: Hero[]} ) => (
    <div data-testid="hero-grid">
      {
        heroes.map( hero  => (
          <div key={hero.id}>{hero.name}</div>
        ))
      }
    </div>
  )
}));

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

mockSearchHeroesAction.mockResolvedValue([]);

const queryClient = new QueryClient();

const renderSearchPage = ( initialEntries?: string[] ) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} >
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('SearchPage.test', () => {

  beforeEach( () => {
    vi.clearAllMocks();
    queryClient.clear();
  });
  
  test( 'should render search page with default props', () => {
    const { container } = renderSearchPage( ['/'] );

    expect( mockSearchHeroesAction ).toHaveBeenCalledWith({
      "name": "",
      "strength": "",
    });

    expect( container ).toMatchSnapshot();
  });

  test( 'should call search action with query parameter', () => {
    const name = 'superman';
    const { container } = renderSearchPage( [`/search?query=${name}`] );
    expect( mockSearchHeroesAction ).toHaveBeenCalledWith({
      "name": name,
      "strength": "",
    });

    expect( container ).toMatchSnapshot();
  });

  test( 'should call search action with strength parameter', () => {
    const strength = '6';
    const { container } = renderSearchPage( [`/search?strength=${strength}`] );
    expect( mockSearchHeroesAction ).toHaveBeenCalledWith({
      "name": "",
      "strength": strength,
    });

    expect( container ).toMatchSnapshot();
  });

  test( 'should call search action with strength and query parameter', () => {
    const strength = '6';
    const name = 'superman';
    const { container } = renderSearchPage( [`/search?strength=${strength}&query=${name}`] );
    expect( mockSearchHeroesAction ).toHaveBeenCalledWith({
      "name": name,
      "strength": strength,
    });

    expect( container ).toMatchSnapshot();
  });

  test( 'should render HeroGrid with search results', async () => {
    const mockHeroes = [
      { id: '1', name: 'Clark Kent' } as unknown as Hero,
      { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
    ];

    mockSearchHeroesAction.mockResolvedValue( mockHeroes );

    renderSearchPage( );

    expect( mockSearchHeroesAction ).toHaveBeenCalled();
    await waitFor( () => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
    const grid = screen.getByTestId('hero-grid');
    expect( grid ).toBeDefined();
  });
  
});