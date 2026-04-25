import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";

vi.mock('../../actions/search-heroes.action');
vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: ( ) => <div>CustomJumbotron</div>
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
  test( 'should render search page with default props', () => {
    const { container } = renderSearchPage( ['/'] );

    expect( mockSearchHeroesAction ).toHaveBeenCalledWith({
      "name": "",
      "strength": "",
    });

    expect( container ).toMatchSnapshot();
  });
});