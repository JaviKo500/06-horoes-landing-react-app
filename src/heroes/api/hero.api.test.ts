import { describe, expect, test } from "vitest";
import { heroApi } from './hero.api';

const BASE_URL = import.meta.env.VITE_API_URL;

describe('Hero.api.test', () => {
  test( 'should be configured point to test server', () => {
    expect( heroApi.defaults.baseURL ).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain('3001');
  });
}); 