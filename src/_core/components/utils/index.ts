import { isValidElement, ReactElement, ReactNode, useMemo } from 'react';

const COMPONENT_PREFIX =
  '\u0074\u0065\u0063\u006f\u002d\u0063\u006f\u0072\u0065\u002d';

export function useElementStyle(children?: ReactNode) {
  return useMemo(() => {
    if (!isValidElement(children)) {
      return {};
    }
    const element = children as ReactElement;
    const { style } = element.props;
    console.log(style ?? {});
    return style ?? {};
  }, [children]);
}

export function prefixClassname(component: string) {
  return `${COMPONENT_PREFIX}${component}`;
}
