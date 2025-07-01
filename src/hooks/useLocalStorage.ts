import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  validate?: (data: unknown) => data is T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : null;

      const isValid = validate ? validate(parsed) : parsed !== null;

      if (isValid) {
        setState(parsed);
      } else {
        setState(defaultValue);
      }
    } catch (e) {
      setState(defaultValue);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
}
