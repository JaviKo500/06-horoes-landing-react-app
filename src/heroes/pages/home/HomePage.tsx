import { useState } from "react"

import {
  Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { getHeroByPageAction } from "@/heroes/actions/get-hero-by-page.action"

export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<
  'all' | 'favorites' | 'heroes' | 'villains'
  >('all');
  
  const { data } = useQuery({
    queryKey: [ 'heroes' ],
    queryFn: () => getHeroByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // useEffect(() => {
  //   getHeroByPageAction().then();
  // }, [])
  
  return (
    <>
        {/* Header */}
        <CustomJumbotron title="Superhero Universe" subtitle="Discover, explore, and manage your favorite superheroes and villains" />

        {/* Breadcrumb */}
        <CustomBreadcrumb  currentPage="Super Hero"  breadcrumbs={[]}/>

        {/* Stats Dashboard */}
        <HeroStats />


        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setActiveTab('favorites')}>
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActiveTab('villains')}>Villains (2)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" >
            {/* Character Grid */}
            <HeroGrid />
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
        <CustomPagination totalPages={4} />
      </>
  )
}