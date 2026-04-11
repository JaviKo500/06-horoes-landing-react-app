import { AxiosError } from "axios";
import { describe, expect, test } from "vitest";

import { getHeroAction } from "./get-hero.action";

const baseUrl = import.meta.env.VITE_API_URL ?? '';

describe('Get-hero.action.test', () => {
  test( 'should fetch hero data and return with complete image url', async () => {
    const slug = 'clark-kent';
    const hero = await getHeroAction(slug);
    expect(hero.image).toContain(`${baseUrl}`);
    expect(hero.slug).toBe(slug);
  });

  test( 'should throw an error if hero is not found', async () => {
    const slug = 'not-found';
    const result = await getHeroAction(slug).catch((error) => {
      expect(error).toBeInstanceOf(AxiosError); 
      expect(error.response?.status).toBe(404);
      expect(error.status).toBe(404);
    });

    expect(result).toBeUndefined();
  });
});