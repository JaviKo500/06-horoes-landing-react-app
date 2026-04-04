import { RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { appRouter } from "./router/app.router"
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"

const queryClient = new QueryClient()

export const HeroesApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={appRouter} />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </>
  )
}
