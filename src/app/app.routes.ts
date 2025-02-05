import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full',
      },
      {
        path: 'posts',  // Lazy loading for posts
        loadChildren: () =>
          import('./pages/posts/posts.routes').then((m) => m.PostsRoutes),
      },
      {
        path: 'ajoutpost',  
        loadChildren: () =>
          import('./pages/user/user.routes').then((m) => m.UserRoutes),
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.routes').then(
            (m) => m.UserRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
