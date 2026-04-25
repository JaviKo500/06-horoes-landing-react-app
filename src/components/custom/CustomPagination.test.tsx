import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type React from "react";
import type { PropsWithChildren } from "react";

vi.mock('../ui/button', () => ({
  Button: ( {children, ...props  }: PropsWithChildren ) => <button {...props}>{children}</button>
}));

const renderWithRouter = ( component: React.ReactElement, initialEntries?: string[] ) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} >
      {component}
    </MemoryRouter>
  )
}

describe('CustomPagination.test', () => {
  test( 'should render component with default props', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    expect( screen.getByText('Next') ).toBeDefined();
    expect( screen.getByText('Previous') ).toBeDefined();
    expect( screen.getByText('1') ).toBeDefined();
    expect( screen.getByText('2') ).toBeDefined();
    expect( screen.getByText('3') ).toBeDefined();
    expect( screen.getByText('4') ).toBeDefined();
    expect( screen.getByText('5') ).toBeDefined();
  });

  test( 'should disabled previous button when current page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByText('Previous');
    expect( previousButton.getAttributeNames() ).toContain('disabled');
  });

  test( 'should disabled next button when current page is last', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5'] );
    const nextButton = screen.getByText('Next');
    expect( nextButton.getAttributeNames() ).toContain('disabled');
  });

  test( 'should disabled button 3 when are in page 3', () => {
    renderWithRouter(<CustomPagination totalPages={5}  />, ['/?page=3'] );
    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');
    screen.debug(button3)

    expect( button2.getAttribute('variant') ).toBe('outline');
    expect( button3.getAttribute('variant') ).toBe('default');
  });
});