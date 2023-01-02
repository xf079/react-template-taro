import { useCallback, useEffect, useRef } from 'react';
import { isNumber } from '@/utils';
import useLatest from './useLatest';

const useInterval = (
  fn: () => void,
  options: {
    delay: number | undefined;
    immediate?: boolean;
  }
) => {
  const { immediate = false, delay = undefined } = options;
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
    if (!isNumber(delay) || delay < 0) {
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
