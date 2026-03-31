import type { Hero } from './hero.interface';

export interface HeroResponse {
  total?: number;
  pages?: number;
  heroes?: Hero[];
}