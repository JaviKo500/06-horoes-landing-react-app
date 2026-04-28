import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if ( typeof window.ResizeObserver === 'undefined' ) {
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  window.ResizeObserver = ResizeObserver;
}

const renderSearchControls = ( initialEntries: string[] = ['/'] ) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} >
      <SearchControls />
    </MemoryRouter>
  );
}

describe('SearchControls.test', () => {
  test( 'should render search controls with default props', () => {
    const { container } = renderSearchControls( ['/'] );
    expect( container ).toMatchSnapshot();
  });
});