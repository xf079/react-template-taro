import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../use-latest';

export interface OptionsType {
  delay?: number;
  immediate?: boolean;
}

const useTimeout = (fn: () => void, options?: Partial<OptionsType>) => {
  const { immediate = false, delay } = options || {};
  const handlerRef = useLatest(fn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const run = useCallback(() => {
    timerRef.current = setTimeout(() => {
      handlerRef.current();
    }, delay);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!delay || delay < 0) {
      return;
    }
    if (immediate) {
      run();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return [run, clear];
};

export default useTimeout;
