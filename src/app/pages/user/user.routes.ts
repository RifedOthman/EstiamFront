import { Routes } from '@angular/router';
import { AjoutUserComponent } from './ajoutuser/ajoutuser.component';


export const UserRoutes: Routes=[
     {
        path: '',
        children: [
          {
            path: 'ajoutuser',
            component: AjoutUserComponent,
          },
          {
            path: 'updateuser',
            component: AjoutUserComponent,
          }
        ],
      },

];