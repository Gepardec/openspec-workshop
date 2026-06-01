import {
  EmptyFeatureResult,
  SignalStoreFeature,
  signalStoreFeature,
  withState,
} from '@ngrx/signals';

export type CallStatus = 'init' | 'loading' | 'loaded' | { error: string };

export type CallStatusState = {
  callStatus: CallStatus;
};

type EmptyFeatureProps = Record<string, never>;
type EmptyFeatureMethods = Record<string, never>;

export function withCallStatus(): SignalStoreFeature<
  EmptyFeatureResult,
  { state: CallStatusState; props: EmptyFeatureProps; methods: EmptyFeatureMethods }
> {
  return signalStoreFeature(withState<CallStatusState>({ callStatus: 'init' }));
}

export function setLoading(): Partial<CallStatusState> {
  return { callStatus: 'loading' };
}

export function setLoaded(): Partial<CallStatusState> {
  return { callStatus: 'loaded' };
}

export function setError(error: unknown): Partial<CallStatusState> {
  return {
    callStatus: {
      error: error instanceof Error ? error.message : 'Unknown error',
    },
  };
}
