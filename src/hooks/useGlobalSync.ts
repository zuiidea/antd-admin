import type { GlobalState } from '@/store/useGlobalStore';
import useGlobalStore from '@/store/useGlobalStore';
import { useSyncExternalStore } from 'react';

type Selector<T> = (s: GlobalState) => T;

export default function useGlobalSync<T>(selector: Selector<T>) {
  return useSyncExternalStore(
    (listener: () => void) => {
      // subscribe returns unsubscribe
      const unsub = useGlobalStore.subscribe(listener);
      return unsub;
    },
    () => selector(useGlobalStore.getState()),
    () => selector(useGlobalStore.getState()),
  );
}
