import {
  Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router"

import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { getHeroByPageAction } from "@/heroes/actions/get-hero-by-page.action"
import { useMemo } from "react"
import { useHeroSummary } from "../hooks/useHeroSummary"

export const HomePage = () => {

  const [ searchParams, setSearchParams ] = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'all';
  const page = parseInt( searchParams.get('page') || '1' );
  const limit = parseInt( searchParams.get('limit') || '6' );

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [ activeTab ] );

  const { data: heroesResponse } = useQuery({
    queryKey: [ 'heroes', { page, limit } ],
    queryFn: () => getHeroByPageAction( page, limit ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: summaryData } = useHeroSummary();

  console.log('<--------------- JK HomePage --------------->');
  console.log(heroesResponse);
  // useEffect(() => {
  //   getHeroByPageAction().then();
  // }, [])
  
  const setActiveTab = ( tab: string ) => {
    setSearchParams(( prev ) => {
      prev.set('tab', tab);
      return prev;
    });
  }

  return (
    <>
        {/* Header */}
        <CustomJumbotron title="Superhero Universe" subtitle="Discover, explore, and manage your favorite superheroes and villains" />

        {/* Breadcrumb */}
        <CustomBreadcrumb  currentPage=""  breadcrumbs={[]}/>

        {/* Stats Dashboard */}
        <HeroStats />


        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Characters ({summaryData?.totalHeroes ?? 0})</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setActiveTab('favorites')}>
              <Heart className="h-4 w-4" />
              Favorites (3)
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
            <HeroGrid />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Character Grid */}
            <HeroGrid />
          </TabsContent>
          <TabsContent value="villains">
            {/* Character Grid */}
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>
      </>
  )
}