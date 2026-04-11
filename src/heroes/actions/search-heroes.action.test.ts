import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from "../api/hero.api";
import { searchHeroesAction } from "./search-heroes.action";

const baseUrl = import.meta.env.VITE_API_URL ?? '';

describe('Search-heroes.action.test', () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });
  test( 'should return empty array if no options are provided', async () => {
    heroesApiMock.onGet('/search').reply( 200, [] );
    heroesApiMock.resetHistory();
    const response = await searchHeroesAction({});

    const request = heroesApiMock.history;

    expect(request).toEqual([]);
    expect(response).toEqual([]);
  });

  test( 'should call with a correct options', async () => {
    const data = [
      {
        image: `1.jpeg`,
        name: 'Superman',
        slug: 'clark-kent',
      },
    ];

    heroesApiMock.onGet('/search').reply( 200, data );
    heroesApiMock.resetHistory();

    const options = {
      name: 'Superman',
      team: 'Justice League',
      category: 'heroes',
      universe: 'Marvel',
      status: 'alive',
      strength: '10',
    };
    const response = await searchHeroesAction( options );

    const request = heroesApiMock.history;

    expect( response ).toStrictEqual(
      data.map( hero => ({
        ...hero,
        image: `${baseUrl}/images/${hero.image}`,
      })
    ));
    for (const req of request) {
      expect(req.params).toStrictEqual( options );
    } 
  });
});