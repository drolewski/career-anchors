import { useState, useEffect, useCallback } from 'react';

function useStorage(key, initialValue, storage = localStorage) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting storage key "${key}":`, error);
    }
  }, [key, storedValue, storage]);

  const removeValue = useCallback(() => {
    try {
      storage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue, storage]);

  return [storedValue, setValue, removeValue];
}

export function useLocalStorage(key, initialValue) {
  return useStorage(key, initialValue, localStorage);
}

export const SESSION_KEYS = {
  DEMOGRAPHICS: 'schein_demographics',
  RATINGS: 'schein_ratings',
  TOP3: 'schein_top3',
  STEP: 'schein_step',
  RESULT: 'schein_result',
  PREVIOUS_RESULT: 'schein_previous_result',
};
