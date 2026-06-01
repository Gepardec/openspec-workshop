import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { Animal } from './animal';
import { AnimalService } from './animal.service';
import { setError, setLoaded, setLoading, withCallStatus } from './call-status.feature';

export const AnimalStore = signalStore(
  withEntities<Animal>(),
  withCallStatus(),
  withMethods((store) => {
    const animalService = inject(AnimalService);

    return {
      loadAnimals: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            animalService.getAnimals().pipe(
              tapResponse({
                next: (animals) => patchState(store, setAllEntities(animals), setLoaded()),
                error: (error) => patchState(store, setError(error)),
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
