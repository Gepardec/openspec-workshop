import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { Animal } from '../model/animal';
import { AnimalService } from './animal.service';
import { setError, setLoaded, setLoading, withCallStatus } from './call-status.feature';

type AnimalProfileState = {
  selectedAnimalId: number | null;
};

export const AnimalStore = signalStore(
  { providedIn: 'root' },
  withEntities<Animal>(),
  withCallStatus(),
  withState<AnimalProfileState>({
    selectedAnimalId: null,
  }),
  withComputed((store) => ({
    selectedAnimal: computed(() =>
      store.entities().find((animal) => animal.id === store.selectedAnimalId()),
    ),
    selectedAnimalNotFound: computed(
      () => !store.entities().some((animal) => animal.id === store.selectedAnimalId()),
    ),
  })),
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
      selectAnimalById: rxMethod<number>(
        pipe(
          tap((selectedAnimalId) => {
            patchState(store, { selectedAnimalId });
          }),
        ),
      ),
    };
  }),
  withHooks({
    onInit: (store) => {
      store.loadAnimals();
    },
  }),
);
