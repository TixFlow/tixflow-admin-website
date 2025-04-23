export const isWindow = typeof window !== "undefined";

export function getFromLocalStorage<T>(key: string): T | null {
  const item = isWindow && window.localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null;
    }
  }
  return null;
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (isWindow) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
    }
  }
}

export function removeFromLocalStorage(key: string): void {
  if (isWindow) {
    try {
      isWindow && window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item "${key}":`, error);
    }
  }
}

export function clearLocalStorage(): void {
  if (isWindow) {
    try {
      isWindow && window.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
