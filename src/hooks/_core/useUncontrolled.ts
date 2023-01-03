import { useState } from 'react';

interface UseUncontrolledInput<T> {
  /** 受控状态值 */
  value?: T;
  /** 未受控状态的初始值 */
  defaultValue?: T;
  /** 当value和defaultValue未提供时，未受控状态的最终值 */
  finalValue?: T;
  /** 受控状态的onChange处理程序 */
  onChange?(value: T): void;
}

type UseUncontrolledOutput<T> = [T, (value: T) => void, boolean];

const useUncontrolled = <T>(
  options: UseUncontrolledInput<T>
): UseUncontrolledOutput<T> => {
  const { value, defaultValue, finalValue, onChange = () => {} } = options;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue !== undefined ? defaultValue : finalValue
  );
  const handleUncontrolledChange = (val: T) => {
    setUncontrolledValue(val);
    onChange?.(val);
  };
  if (value !== undefined) {
    return [value as T, onChange, true];
  }
  return [uncontrolledValue as T, handleUncontrolledChange, false];
};

export default useUncontrolled;
