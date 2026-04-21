import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { usePaginationHeroes } from "./usePaginationHeroes";
import { getHeroByPageAction } from "@/heroes/actions/get-hero-by-page.action";

vi.mock('@/heroes/actions/get-hero-by-page.action', () => ({
  getHeroByPageAction: vi.fn(),
}))

const mockGetHeroByPageAction = vi.mocked( getHeroByPageAction );

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  }
);
const tanStackCustomProvider = () => {
  return ( {children}: PropsWithChildren ) =>(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('UsePaginationHeroes.test', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test( 'should return the initial state (isLoading)', () => {
    const { result } = renderHook(() => usePaginationHeroes({
      category: 'all',
      limit: 10,
      page: 1,
    })  , {
      wrapper: tanStackCustomProvider(),
    });
    expect( result.current.isLoading ).toBeTruthy();
    expect( result.current.data ).toBeUndefined();
    expect( result.current.error ).toBeFalsy();
  });

  test( 'should return success state with data when api call succeeds', async () => {
    const mockData = {
      heroes: [
        {
          id: '1',
          name: 'Superman',
        },
        {
          id: '2',
          name: 'Batman',
        },
      ],
      total: 2,
      page: 1,
    };

    mockGetHeroByPageAction.mockResolvedValue( mockData );

    const { result } = renderHook(() => usePaginationHeroes({
      category: 'all',
      limit: 10,
      page: 1,
    }) , {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect( result.current.isSuccess ).toBeTruthy();
    });

    expect( result.current.isLoading ).toBeFalsy();
    expect( result.current.data ).toBeDefined();
    expect( result.current.isError ).toBeFalsy();

    expect( getHeroByPageAction ).toHaveBeenCalled();
    expect( mockGetHeroByPageAction ).toHaveBeenCalledWith( 1, 10, 'all' );
  });

  test( 'should call getHeroByPageAction with correct params', async () => {
    const mockData = {
      heroes: [
        {
          id: '1',
          name: 'Superman',
        },
        {
          id: '2',
          name: 'Batman',
        },
      ],
      total: 2,
      page: 1,
    };

    mockGetHeroByPageAction.mockResolvedValue( mockData );

    const { result } = renderHook(() => usePaginationHeroes({
      category: 'heroes',
      limit: 10,
      page: 1,
    }) , {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect( result.current.isSuccess ).toBeTruthy();
    });

    expect( result.current.isLoading ).toBeFalsy();
    expect( result.current.data ).toBeDefined();
    expect( result.current.isError ).toBeFalsy();

    expect( getHeroByPageAction ).toHaveBeenCalled();
    expect( mockGetHeroByPageAction ).toHaveBeenCalledWith( 1, 10, 'heroes' );
  });
});