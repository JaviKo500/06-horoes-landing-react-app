import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { HeroStats } from "./HeroStats";
import { useHeroSummary } from "../pages/hooks/useHeroSummary";
import type { SummaryHeroResponse } from "../types/get-summary.response";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";

vi.mock("../pages/hooks/useHeroSummary");
const mockUseHeroSummary = vi.mocked( useHeroSummary );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockHero = {
  id: '1',
  name: 'Superman',
  strength: 10,
}
const mockDataSummary: SummaryHeroResponse = {
  totalHeroes: 10,
  heroCount: 5,
  villainCount: 5,
  strongestHero: mockHero,
  smartestHero: {
    id: '2',
    name: 'Batman',
    intelligence: 10,
  },
};

const renderHeroStats = ( mockData?: Partial<SummaryHeroResponse> ) => {
  mockUseHeroSummary.mockReturnValue({
    data: mockData
  } as unknown as UseQueryResult<SummaryHeroResponse>);
  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
}

describe('HeroStats.test', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test( 'should render component with default values', () => {
    renderHeroStats();
    expect( screen.getByText('Loading...') ).toBeDefined();
  });

  test( 'should render HeroStats with mock information', () => {
    const { container } = renderHeroStats( mockDataSummary );
    expect( container ).toMatchSnapshot();
    expect( screen.getByText('Total Characters') ).toBeDefined();
    expect( screen.getByText('Favorites') ).toBeDefined();
  });

  test( 'should change percentage of favorites when a hero is added', () => {
    localStorage.setItem('favorites', JSON.stringify([mockHero]));
    renderHeroStats( mockDataSummary );

    const favoritePercentageElement = screen.getByTestId('favorite-percentage');
    expect( favoritePercentageElement.innerHTML ).toContain('10.00% of total');

    const favoriteCountElement = screen.getByTestId('favorite-count');
    expect( favoriteCountElement.innerHTML ).toContain('1');
  });
});