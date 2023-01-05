import { useCallback, useEffect, useRef } from 'react';
import { isNumber } from 'lodash-es';
import useLatest from '@/hooks/_core/useLatest';

const useTimeout = (
  fn: () => void,
  options?: Partial<{
    delay: number | undefined;
    immediate: boolean;
  }>
) => {
  const { immediate = false, delay = undefined } = options || {};
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
    if (!isNumber(delay) || delay < 0) {
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
