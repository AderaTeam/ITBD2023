import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ANALYSIS_ROUTE,
  STATISTICS_ROUTE,
  HISTORY_ROUTE,
  ONE_ANALYSIS_ROUTE,
  MAP_ROUTE,
} from 'shared/constants/const';
import { lazy } from 'react';

const auth = lazy(() => import('pages/auth'));
const statistics = lazy(() => import('pages/statistics'));
const analysis = lazy(() => import('pages/analysis'));
const history = lazy(() => import('pages/history'));
const map = lazy(() => import('pages/map'));

export const authRoutes = [
  {
    path: ANALYSIS_ROUTE,
    Component: analysis,
    title: 'Aнализ обращения',
    isAdmin: true,
  },
  {
    path: ONE_ANALYSIS_ROUTE,
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
  {
    path: HISTORY_ROUTE,
    Component: history,
    title: 'История',
    isAdmin: true,
  },
  {
    path: MAP_ROUTE,
    Component: map,
    title: 'История',
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
