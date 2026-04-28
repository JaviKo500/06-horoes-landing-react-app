import { fireEvent, render, screen } from "@testing-library/react";
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

  test( 'should set input value when param name is set', () => {
    renderSearchControls(['/?query=superman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
    expect( input.getAttribute('value') ).toBe('superman');
  });

  test( 'should change params when input change and enter pressed', () => {
    renderSearchControls(['/?query=superman']);
    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
    expect( input.getAttribute('value') ).toBe('superman');
    
    fireEvent.change( input, { target: { value: 'Batman' } } );
    fireEvent.keyDown( input, { key: 'Enter', code: 'Enter' } );
    
    expect( input.getAttribute('value') ).toBe('Batman');
  });

  test( 'should change params strength when slider change', () => {
    renderSearchControls(['/?query=Batman&accordion-active=advanced-filters']);
    const slider = screen.getByRole('slider');

    expect( slider.getAttribute('aria-valuenow') ).toBe('0');
    
    fireEvent.keyDown(slider, { key: 'ArrowRight' }  )
    
    expect( slider.getAttribute('aria-valuenow') ).toBe('1');
  });

  test( 'should accordion be open when active-accordion param is set', () => {
    renderSearchControls(['/?query=Batman&accordion-active=advanced-filters']);
    const accordion= screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect( accordionItem?.getAttribute('data-state') ).toBe('open');
  });

  test( 'should accordion be closed when active-accordion param is set', () => {
    renderSearchControls(['/?query=Batman&accordion-active=advanced-filters']);
    const accordion= screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect( accordionItem?.getAttribute('data-state') ).toBe('open');
  });
});