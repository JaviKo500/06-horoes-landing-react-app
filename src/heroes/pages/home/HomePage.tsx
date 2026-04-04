import {
  Heart,
} from "lucide-react"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { usePaginationHeroes } from "../hooks/usePaginationHeroes"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {

  const [ searchParams, setSearchParams ] = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'all';
  const page = parseInt( searchParams.get('page') || '1' );
  const limit = parseInt( searchParams.get('limit') || '6' );
  const category = searchParams.get('category') || 'all';

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [ activeTab ] );

  const selectedCategory = useMemo(() => {
    const validCategories = ['all', 'hero', 'villain'];
    return validCategories.includes(category) ? category : 'all';
  }, [ category ] );
  

  const { data: heroesResponse } = usePaginationHeroes({ page, limit, category: selectedCategory });

  const { data: summaryData } = useHeroSummary();

  // useEffect(() => {
  //   getHeroByPageAction().then();
  // }, [])
  
  const setActiveTab = ( tab: string ) => {
    let category = 'all';
    switch (tab) {
      case 'villains':
        category = 'villain';
        break;
      case 'heroes':
        category = 'hero';
        break;
      default:
        category = 'all';
        break;
    }
    setSearchParams(( prev ) => {
      prev.set('tab', tab);
      prev.set('category', category);
      prev.set('page', '1');
      return prev;
    });
  }

  return (
    <>
        {/* Header */}
        <CustomJumbotron title="Superhero Universe" subtitle="Discover, explore, and manage your favorite superheroes and villains" />

        {/* Breadcrumb */}
        <CustomBreadcrumb  currentPage="Heroes"  breadcrumbs={[]}/>

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Characters ({summaryData?.totalHeroes ?? 0})</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setActiveTab('favorites')}>
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')}>Heroes ({summaryData?.heroCount ?? 0})</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActiveTab('villains')}>Villains ({summaryData?.villainCount ?? 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" >
            {/* Character Grid */}
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Character Grid */}
            <HeroGrid heroes={favorites}/>
          </TabsContent>
          <TabsContent value="heroes">
            {/* Character Grid */}
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Character Grid */}
            <HeroGrid heroes={heroesResponse?.heroes} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>
          )
        }
      </>
  )
}