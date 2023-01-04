import {
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode
} from 'react';
import {
  get,
  isEmpty,
  endsWith,
  isArray,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined
} from 'lodash-es';

export const isNoneElement = (node: ReactNode) => {
  return isUndefined(node) || isNull(node);
};

export const isTextElement = (node: ReactNode) => {
  return isNumber(node) || isString(node);
};

export const isObjectElement = (node?: ReactNode) => {
  return !isValidElement(node) && isObject(node) && !isArray(node);
};

export const isElementOf = (
  node?: ReactNode,
  type?: JSXElementConstructor<any>
) => {
  if (isValidElement(node)) {
    const element = node as ReactElement;
    if (element.type === type) {
      return true;
    }
    const displayName = get(element.type, 'displayName');
    if (
      isFunction(element.type) &&
      !isEmpty(displayName) &&
      endsWith(displayName, get(type, 'displayName'))
    ) {
      return true;
    }
  }
  return false;
};
