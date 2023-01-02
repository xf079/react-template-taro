const COMPONENT_PREFIX = '\u0063\u006f\u0072\u0065-';

export function prefixClassname(component: string) {
  return `${COMPONENT_PREFIX}${component}`;
}
