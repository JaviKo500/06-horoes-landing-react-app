import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotron title="Superhero Universe" subtitle="Search for your favorite superhero and villain" />
      {/*Stats Dashboard */}
      <HeroStats />
    </>
  )
}

export default SearchPage;