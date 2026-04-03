import { heroApi } from "../api/hero.api"
import type { HeroResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = 'all',
): Promise<HeroResponse> => {
  if ( isNaN(page)  ){
    page = 1;
  }
  if ( isNaN(limit) ){
    limit = 6;
  }

  const {data} = await heroApi.get<HeroResponse>('/', {
    params: {
      offset: (page - 1) * limit,
      limit,
      category,
    }
  });
  const heroes = data.heroes?.map( ( hero ) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  })); 
  return {
    ...data,
    heroes,
  };
}