import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginationHeroes } from "../hooks/usePaginationHeroes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('HomePage.test', () => {
  test( 'should render home page with default props', () => {
    const { container } =  renderHomePage();
    expect( container ).toMatchSnapshot();
  });
});