import { useRef } from 'react';
// import { defaultNamespace } from '@linkio/constants';

const defaultNamespace = 'test';

const statePrefix = 'is-';

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

const useNamespace = (block: string) => {
  const namespace = useRef(defaultNamespace);
  const b = (blockSuffix = '') =>
    _bem(namespace.current, block, blockSuffix, '', '');
  const e = (element?: string) =>
    element ? _bem(namespace.current, block, '', element, '') : '';
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.current, block, '', '', modifier) : '';

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.current, block, blockSuffix, element, '')
      : '';
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.current, block, '', element, modifier)
      : '';
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.current, block, blockSuffix, '', modifier)
      : '';
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.current, block, blockSuffix, element, modifier)
      : '';

  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
};
export default useNamespace;
export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
