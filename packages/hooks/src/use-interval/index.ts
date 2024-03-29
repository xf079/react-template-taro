import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../use-latest';

export interface OptionsType {
  delay?: number;
  immediate?: boolean;
}

const useInterval = (fn: () => void, options: OptionsType) => {
  const { immediate = false, delay } = options;
  const handlerRef = useLatest(fn);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const run = useCallback(() => {
    timerRef.current = setInterval(() => {
      handlerRef.current();
    }, delay);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!delay || delay < 0) {
      return;
    }
    if (immediate) {
      handlerRef.current();
      run();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return [run, clear];
};

export default useInterval;
