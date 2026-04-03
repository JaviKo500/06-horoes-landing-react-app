import { heroApi } from "../api/hero.api";
import type { SummaryHeroResponse } from "../types/get-summary.response";

export const getSummaryAction = async () => {
  const { data } = await heroApi.get<SummaryHeroResponse>('/summary');
  return data;
}