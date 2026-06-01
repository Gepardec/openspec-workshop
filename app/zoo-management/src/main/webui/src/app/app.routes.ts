import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'animals',
  },
  {
    path: 'animals',
    loadComponent: () =>
      import('./domains/animals/animal-list/animal-list').then((module) => module.AnimalListComponent),
  },
];
