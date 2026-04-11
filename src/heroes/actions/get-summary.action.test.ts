import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";

describe('Get-summary.action.test', () => {
  test( 'should fetch summary and return complete information', async () => {
    const summary = await getSummaryAction();
    expect( summary.totalHeroes ).toBeGreaterThanOrEqual(0);
    expect( summary.heroCount ).toBeGreaterThanOrEqual(0);
    expect( summary.villainCount ).toBeGreaterThanOrEqual(0);
    const objectMatch = {
      name: expect.any(String),
      slug: expect.any(String),
      universe: expect.any(String),
      category: expect.any(String),
      strength: expect.any(Number),
      intelligence: expect.any(Number),
    };
    expect( summary.smartestHero ).toMatchObject(objectMatch);
    expect( summary.strongestHero ).toMatchObject(objectMatch);
  });
});