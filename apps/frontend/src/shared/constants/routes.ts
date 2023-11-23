import { LOGIN_ROUTE, REGISTRATION_ROUTE, REQUESTS_ROUTE, STATISTICS_ROUTE } from 'shared/constants/const';
import { IconDeviceAnalytics, IconHistory } from '@tabler/icons-react';
import { lazy } from 'react';

const auth = lazy(() => import('pages/auth'));
const statistics = lazy(() => import('pages/statistics'));
const requests = lazy(() => import('pages/requests'));

export const authRoutes = [
  {
    path: STATISTICS_ROUTE,
    Component: statistics,
    title: 'Статистика',
    isAdmin: true,
  },
  {
    path: REQUESTS_ROUTE,
    Component: requests,
    title: 'Список обращений',
    isAdmin: true,
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
