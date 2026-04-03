import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Zap } from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useQuery } from "@tanstack/react-query"
import { getSummaryAction } from "../actions/get-summary.action"

export const HeroStats = () => {
  const { data: summaryData } = useQuery({
    queryKey: [ 'summary-response' ],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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
      {/* TODO: Implement Favorites */}
      <HeroStatCard 
        title="Favorites" 
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">3</div>
        <p className="text-xs text-muted-foreground">18.8% of total</p>
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
