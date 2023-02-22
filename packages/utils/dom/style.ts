import { isValidElement, ReactElement, ReactNode, useMemo } from 'react';

export function getElementStyle(children?: ReactNode) {
  return useMemo(() => {
    if (!isValidElement(children)) {
      return {};
    }
    const element = children as ReactElement;
    const { style } = element.props;
    return style ?? {};
  }, [children]);
}
