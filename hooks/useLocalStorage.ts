import { useEffect, useState } from 'react';

type LocalStorageItem = [] | object | string;

export default function useLocalStorage(
  key: string,
  initialValue: LocalStorageItem
) {
  const [storedValue, setStoredValue] =
    useState<LocalStorageItem>(initialValue);

  useEffect(() => {
    setStoredValue((key: string) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  }, [key, initialValue]);

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
