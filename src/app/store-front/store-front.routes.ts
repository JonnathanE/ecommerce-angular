import { StoreFrontLayout } from './layouts/store-front-layout/store-front-layout';
import { HomePage } from './pages/home-page/home-page';

export const storeFrontRoutes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        // loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
        component: HomePage,
      },
      {
        path: 'gender/:gender',
        loadComponent: () => import('./pages/gender-page/gender-page').then((m) => m.GenderPage),
      },
      {
        path: 'product/:idSlug',
        loadComponent: () => import('./pages/product-page/product-page').then((m) => m.ProductPage),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
