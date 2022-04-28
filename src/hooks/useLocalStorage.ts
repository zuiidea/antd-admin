import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] => {
  let defaultValue = initialValue;
  try {
    const item = window.localStorage.getItem(key);
    defaultValue = item ? JSON.parse(item) : initialValue;
  } catch (error) {
    defaultValue = initialValue;
  }

  const [state, setState] = useState(defaultValue as T);
  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
