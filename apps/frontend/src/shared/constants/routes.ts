import { LOGIN_ROUTE, REGISTRATION_ROUTE } from 'shared/constants/const';
import { IconDeviceAnalytics, IconHistory } from '@tabler/icons-react';
import { lazy } from 'react';

const auth = lazy(() => import('pages/auth'));
const home = lazy(() => import('pages/home'));

export const authRoutes = [
  {
    path: '/',
    Component: home,
    title: 'login',
    isAdmin: false,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: auth,
    title: 'login',
  },
  {
    path: REGISTRATION_ROUTE,
    Component: auth,
    title: 'registration',
  },
];
