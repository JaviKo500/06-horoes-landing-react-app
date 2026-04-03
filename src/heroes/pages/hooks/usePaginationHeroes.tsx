import { useQuery } from "@tanstack/react-query";

import { getHeroByPageAction } from "@/heroes/actions/get-hero-by-page.action";

interface Props {
  page: number;
  limit: number;
  category: string;
}
export const usePaginationHeroes = ({ page, limit, category }: Props) => {
  return useQuery({
    queryKey: [ 'heroes', { page, limit, category } ],
    queryFn: () => getHeroByPageAction( page, limit, category ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}