export const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === 'object';
};

export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function';
};

export const isArray = (value: unknown) => {
  return value && Array.isArray(value);
};

export const isString = (value: unknown): boolean => typeof value === 'string';
export const isBoolean = (value: unknown): boolean =>
  typeof value === 'boolean';
export const isNumber = (value: unknown): boolean => typeof value === 'number';

export const isUndef = (value: unknown): boolean => value === undefined;

export const isNull = (value): boolean => value === null;
