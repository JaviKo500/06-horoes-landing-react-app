import { AdminPage } from '@/admin/pages/AdminPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hore/HeroPage';
import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { createBrowserRouter } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/hero/1',
    element: <HeroPage/>,
  },
  {
    path: '/search',
    element: <SearchPage/>,
  },
  {
    path: '/admin',
    element: <AdminPage/>,
  },
  {
    path: '/*',
    element: <HomePage/>,
  }
]);