import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [searchParams ] = useSearchParams();
  const query = searchParams.get('query') || '';
  const strength = searchParams.get('strength') || '';

  const { data: heroes } = useQuery({
    queryKey: ['search', {query, strength}],
    queryFn: () => searchHeroesAction({ name: query, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if ( !heroes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CustomJumbotron title="Superhero Universe" subtitle="Search for your favorite superhero and villain" />

      <CustomBreadcrumb currentPage="Search"/>

      {/*Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />

      {/* Results */}
      {
        heroes.length 
        ? (
            <HeroGrid heroes={heroes} />
          )
        : (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">No results found</p>
            <p className="text-gray-600">Try a different query</p>
          </div>
        )
      }
    </>
  )
}

export default SearchPage;