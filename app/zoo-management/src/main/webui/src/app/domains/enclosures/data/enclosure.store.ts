import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import {
  setError,
  setLoaded,
  setLoading,
  withCallStatus,
} from '@gpdc-zoo/shared/util/call-status.feature';
import { Enclosure } from '@gpdc-zoo/enclosures/model/enclosure';
import { EnclosureService } from './enclosure.service';

type EnclosureState = {
  enclosures: Enclosure[];
};

const initialState: EnclosureState = {
  enclosures: [],
};

export const EnclosureStore = signalStore(
  { providedIn: 'root' },
  withCallStatus(),
  withState(initialState),
  withComputed((store) => ({
    loading: computed(() => store.callStatus() === 'loading'),
    error: computed(() => {
      const callStatus = store.callStatus();
      return typeof callStatus === 'object' ? callStatus.error : null;
    }),
  })),
  withMethods((store) => {
    const enclosureService = inject(EnclosureService);

    return {
      loadEnclosures: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            enclosureService.getEnclosures().pipe(
              tapResponse({
                next: (enclosures) => patchState(store, { enclosures, ...setLoaded() }),
                error: (error: unknown) =>
                  patchState(store, { enclosures: [], ...setError(error) }),
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
