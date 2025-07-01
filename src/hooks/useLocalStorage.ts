import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  validate?: (data: unknown) => data is T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    console.log(`Carregando "${key}" do localStorage...`);
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
      console.error(`Erro ao carregar "${key}" do localStorage:`, e);
      setState(defaultValue);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      console.log(key, state);
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
}
