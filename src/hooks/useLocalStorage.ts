import { useEffect, useState } from "react";

function getStorageItem<T>(
  key: string,
  defaultValue: T,
  validate?: (data: unknown) => data is T
): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return defaultValue;
    }

    const parsed = JSON.parse(raw);
    return validate?.(parsed) ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  validate?: (data: unknown) => data is T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    getStorageItem(key, defaultValue, validate)
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(`Failed to set localStorage for key "${key}":`, err);
    }
  }, [key, state]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.newValue === null) {
        return;
      }

      try {
        const parsed = JSON.parse(event.newValue);
        if (validate?.(parsed)) {
          setState(parsed);
        }
      } catch (err) {
        console.error(`Failed to parse localStorage for key "${key}":`, err);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, validate]);

  return [state, setState];
}
