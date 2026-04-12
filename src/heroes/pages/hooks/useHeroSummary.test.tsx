import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type {PropsWithChildren} from 'react';
import { getSummaryAction } from "@/heroes/actions/get-summary.action";
import type { SummaryHeroResponse } from "@/heroes/types/get-summary.response";

vi.mock( '@/heroes/actions/get-summary.action', () => ({
  getSummaryAction: vi.fn(),
}))

const mockGetSummaryAction = vi.mocked( getSummaryAction );

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          retry: false,
        }
      }
    }
  );
  return ( {children}: PropsWithChildren ) =>(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('UseHeroSummary.test', () => {
  test( 'should return the initial state (isLoading)', () => {
    const { result } = renderHook(() => useHeroSummary()  , {
      wrapper: tanStackCustomProvider(),
    });
    expect( result.current.isLoading ).toBeTruthy();
    expect( result.current.data ).toBeUndefined();
    expect( result.current.error ).toBeFalsy();
  });

  // test( 'should return success state with data when api call succeeds', async () => {
  //   const { result } = renderHook(() => useHeroSummary(), {
  //     wrapper: tanStackCustomProvider(),
  //   });

  //   await waitFor(() => {
  //     expect( result.current.isSuccess ).toBeTruthy();
      
  //   });

  //   expect( result.current.isLoading ).toBeFalsy();
  //   expect( result.current.data ).toBeDefined();
  // });

  test( 'should return success state with data when api call succeeds', async () => {
    const summaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        name: 'Superman',
      },
      smartsHero: {
        id: '2',
        name: 'Batman',
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryHeroResponse;

    mockGetSummaryAction.mockResolvedValue( summaryData );
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect( result.current.isSuccess ).toBeTruthy();
    });

    expect( result.current.isLoading ).toBeFalsy();
    expect( result.current.data ).toBeDefined();
    expect( result.current.isError ).toBeFalsy();
    expect( mockGetSummaryAction ).toHaveBeenCalled();

  });

  test( 'should return error state when api call fails', async () => {
    const mockError = new Error('Failed to fetch summary');
    mockGetSummaryAction.mockRejectedValue( mockError );

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect( result.current.isError ).toBeTruthy();
    });


    expect( result.current.error ).toBeDefined();
    expect( result.current.isLoading ).toBeFalsy();
    expect( mockGetSummaryAction ).toHaveBeenCalled();
    expect( result.current.error?.message ).toBe(mockError.message);
  });
});