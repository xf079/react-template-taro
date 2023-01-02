import { useCallback, useRef } from 'react';

const useLock = <T extends any[], R>(fn: (...args: T) => Promise<R>) => {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: T) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const result = await fn(...args);
        lockRef.current = false;
        return result;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn]
  );
};

export default useLock;
