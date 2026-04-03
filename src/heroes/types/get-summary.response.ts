import type { Hero } from "./hero.interface";

export interface SummaryHeroResponse {
  totalHeroes?: number;
  strongestHero?: Hero;
  smartestHero?: Hero;
  heroCount?: number;
  villainCount?: number;
}
