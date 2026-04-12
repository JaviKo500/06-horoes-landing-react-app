import { describe, expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type {PropsWithChildren} from 'react';

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
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    expect( result.current.isLoading ).toBeTruthy();
    expect( result.current.data ).toBeUndefined();
    expect( result.current.error ).toBeFalsy();
  });

});