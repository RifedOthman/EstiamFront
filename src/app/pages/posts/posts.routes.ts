import { Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AjoutPostComponent } from 'src/app/pages/posts/ajoutpost/ajoutpost.component';
import { UpdatePostComponent } from './updatepost/updatepost.component';
export const PostsRoutes: Routes = [
  {
    path: '',
    component: PostsComponent,
    canActivate: [AuthGuard],
  }, 
  {
    path: 'ajoutpost',
    component: AjoutPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updatepost',
    component: UpdatePostComponent,
    canActivate: [AuthGuard],
  }
];
