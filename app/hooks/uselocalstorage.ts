"use client";

import { useCallback, useState } from "react";

/**
 * SSR-safe localStorage-backed state hook.
 *
 * Reads the stored value synchronously via a lazy useState initializer
 * (not an effect) — this component tree is only ever mounted client-side
 * (see the ssr:false dynamic import of the Chatbot widget), so there is no
 * server-rendered DOM output derived from this value to mismatch against.
 * Keeps localStorage in sync on every update.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: failed to read "${key}"`, error);
      return initialValue;
    }
  });

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function"
            ? (next as (prev: T) => T)(prev)
            : next;

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          } catch (error) {
            console.error(`useLocalStorage: failed to write "${key}"`, error);
          }
        }

        return resolved;
      });
    },
    [key]
  );

  return [value, update];
}