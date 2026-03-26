import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title="Superhero Universe" subtitle="Search for your favorite superhero and villain" />

      <CustomBreadcrumb currentPage="Search"/>

      {/*Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />
    </>
  )
}

export default SearchPage;