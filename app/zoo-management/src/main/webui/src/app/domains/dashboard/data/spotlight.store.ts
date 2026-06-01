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
import { SpotlightResponse } from '@gpdc-zoo/dashboard/model/spotlight-response';
import { SpotlightService } from './spotlight.service';

type SpotlightState = {
  spotlight: SpotlightResponse | null;
};

const initialState: SpotlightState = {
  spotlight: null,
};

export const SpotlightStore = signalStore(
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
    const spotlightService = inject(SpotlightService);

    return {
      loadSpotlight: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            spotlightService.getSpotlight().pipe(
              tapResponse({
                next: (spotlight) =>
                  patchState(store, {
                    spotlight,
                    ...setLoaded(),
                  }),
                error: (error: unknown) =>
                  patchState(store, {
                    spotlight: null,
                    ...setError(error),
                  }),
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
