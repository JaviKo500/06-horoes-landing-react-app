import { describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getHeroByPageAction } from "./get-hero-by-page.action";
import { heroApi } from "../api/hero.api";
import { beforeEach } from "node:test";

const baseUrl = import.meta.env.VITE_API_URL ?? '';

describe('Get-hero-by-page.action.test', () => {

  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });
  
  test( 'should return default heroes', async () => {
    heroesApiMock.onGet('/').reply( 200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: `${baseUrl}/images/1.jpeg`,
          name: 'Superman',
          slug: 'clark-kent',
        },
        {
          image: `${baseUrl}/images/2.jpeg`,
          name: 'Batman',
          slug: 'bruce-wayne',
        }
      ]
    });
    const response = await getHeroByPageAction( 2 );
    expect( response.total ).toBeGreaterThanOrEqual(0);
    expect( response.pages ).toBeGreaterThanOrEqual(0);
    expect( response?.heroes?.length ).toBeGreaterThanOrEqual(0);
  });

  test( 'should return correct heroes when page is not a number', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    }

    heroesApiMock.onGet('/').reply( 200, responseObject );
    heroesApiMock.resetHistory();
    await getHeroByPageAction( 'not-a-number' as unknown as number );

    const request = heroesApiMock.history;
    for (const req of request) {
      expect(req.params).toStrictEqual({
        offset: 0,
        limit: 6,
        category: 'all',
      });
    }
  });

  test( 'should return correct heroes when page is a string', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    }

    heroesApiMock.onGet('/').reply( 200, responseObject );
    heroesApiMock.resetHistory();
    await getHeroByPageAction( '5' as unknown as number );

    const request = heroesApiMock.history;
    for (const req of request) {
      expect(req.params).toStrictEqual({
        offset: 24,
        limit: 6,
        category: 'all',
      });
    }
  });

  test( 'should call the api with correct params', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    }

    heroesApiMock.onGet('/').reply( 200, responseObject );
    heroesApiMock.resetHistory();

    await getHeroByPageAction( 5, 5, 'heroes' );

    const request = heroesApiMock.history;
    for (const req of request) {
      expect(req.params).toStrictEqual({
        offset: 20,
        limit: 5,
        category: 'heroes',
      });
    }
  });

  
});