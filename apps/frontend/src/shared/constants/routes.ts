import { LOGIN_ROUTE, REGISTRATION_ROUTE, ANALYSIS_ROUTE, STATISTICS_ROUTE } from 'shared/constants/const';
import { lazy } from 'react';

const auth = lazy(() => import('pages/auth'));
const statistics = lazy(() => import('pages/statistics'));
const analysis = lazy(() => import('pages/analysis'));

export const authRoutes = [
  {
    path: ANALYSIS_ROUTE,
    Component: analysis,
    title: 'Aнализ обращения',
    isAdmin: true,
  },
  {
    path: STATISTICS_ROUTE,
    Component: statistics,
    title: 'Статистика',
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
