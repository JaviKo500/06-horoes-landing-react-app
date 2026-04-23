import { use } from "react"
import { Heart, Trophy, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../pages/hooks/useHeroSummary"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

export const HeroStats = () => {
  const { data: summaryData } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);;

  if ( !summaryData ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard 
        title="Total Characters"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summaryData?.totalHeroes ?? 0}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summaryData?.heroCount ?? 0} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summaryData?.villainCount ?? 0} Villains
          </Badge>
        </div>
      </HeroStatCard>
      <HeroStatCard 
        title="Favorites" 
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">{ ((favoriteCount * 100) / (summaryData?.totalHeroes ?? 1)).toFixed(2) }% of total</p>
      </HeroStatCard>
      <HeroStatCard 
        title="Strongest" 
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summaryData?.strongestHero?.name}</div>
        <p className="text-xs text-muted-foreground">Strength: {summaryData?.strongestHero?.strength ?? 0}/10</p>
      </HeroStatCard>
      <HeroStatCard 
        title="Smartest" 
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summaryData?.smartestHero?.name}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {summaryData?.smartestHero?.intelligence ?? 0}/10</p>
      </HeroStatCard>
    </div>
  )
}
