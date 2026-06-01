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
import { removeEntity, setAllEntities, upsertEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Router } from '@angular/router';
import { pipe, switchMap, tap } from 'rxjs';

import { AnimalCreateDto } from '../model/animal-create-dto';
import { Animal } from '../model/animal';
import { AnimalService } from './animal.service';
import { setError, setLoaded, setLoading, withCallStatus } from './call-status.feature';

type AnimalProfileState = {
  selectedAnimalId: number | null;
};

type AnimalUpdateInput = {
  data: AnimalCreateDto;
  id: number;
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
    const router = inject(Router);

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
      create: rxMethod<AnimalCreateDto>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap((data) =>
            animalService.createAnimal(data).pipe(
              tapResponse({
                next: (animal) => {
                  patchState(store, upsertEntity(animal), setLoaded());
                  void router.navigateByUrl('/animals');
                },
                error: (error) => patchState(store, setError(error)),
              }),
            ),
          ),
        ),
      ),
      update: rxMethod<AnimalUpdateInput>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(({ data, id }) =>
            animalService.updateAnimal(id, data).pipe(
              tapResponse({
                next: (animal) => {
                  patchState(store, upsertEntity(animal), setLoaded());
                  void router.navigate(['/animals', id]);
                },
                error: (error) => patchState(store, setError(error)),
              }),
            ),
          ),
        ),
      ),
      delete: rxMethod<number>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap((id) =>
            animalService.deleteAnimal(id).pipe(
              tapResponse({
                next: () => patchState(store, removeEntity(id), setLoaded()),
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
