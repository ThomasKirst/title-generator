import { useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: [] | object | string
) {
  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (!isBrowser) return initialValue;

      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: [] | object | string) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
