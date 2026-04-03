import { useQuery } from "@tanstack/react-query";

import { getHeroByPageAction } from "@/heroes/actions/get-hero-by-page.action";

interface Props {
  page: number;
  limit: number;
}
export const usePaginationHeroes = ({ page, limit }: Props) => {
  return useQuery({
    queryKey: [ 'heroes', { page, limit } ],
    queryFn: () => getHeroByPageAction( page, limit ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}