import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AdminPage } from '@/admin/pages/AdminPage';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hore/HeroPage';
import { lazy } from 'react';
// import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { createBrowserRouter } from 'react-router';

const SearchPage = lazy( () => 
  import('@/heroes/pages/search/SearchPage') 
);
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'hero/1',
        element: <HeroPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      }
    ]
  },
  {
    path: '/*',
    element: <HomePage />,
  }
]);