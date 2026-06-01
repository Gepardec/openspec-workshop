import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'animals',
  },
  {
    path: 'animals',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('@gpdc-zoo/animals/feature/animal-list/animal-list').then(
            (module) => module.AnimalListComponent,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@gpdc-zoo/animals/feature/animal-create/animal-create').then(
            (module) => module.AnimalCreateComponent,
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('@gpdc-zoo/animals/feature/animal-edit/animal-edit').then(
            (module) => module.AnimalEditComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@gpdc-zoo/animals/feature/animal-profile/animal-profile').then(
            (module) => module.AnimalProfileComponent,
          ),
      },
    ],
  },
];
