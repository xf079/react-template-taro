import { useEffect } from 'react';
import { isFunction } from 'lodash-es';

const useMount = (fn: () => void) => {
  if (!isFunction(fn)) {
    console.error(
      `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`
    );
  }

  useEffect(() => {
    fn?.();
  }, []);
};
export default useMount;
