import { Home } from '~/Home';
import { Login } from '~/Login';
import DefaultLayout from '@/layout/Default';
import LayoutLogin from '@/layout/Login';
import type { AppRoute } from '@/types';

export const routes: AppRoute[] = [
  {
    path: '/chat',
    element: <DefaultLayout />,
    key: 'AppLayout',
    routes: [
      {
        index: true,
        key: 'Home',
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: <LayoutLogin />,
    key: 'LayoutLogin',
    routes: [
      {
        index: true,
        key: 'Login',
        element: <Login />
      }
    ]
  }
];
