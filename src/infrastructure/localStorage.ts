/**
 * Saves a value to localStorage.
 * The value is automatically converted to JSON.
 * @param key The key under which the value will be stored.
 * @param value The value to be saved (can be any type, will be JSON.stringified).
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error)
  }
}

/**
 * Reads a value from localStorage.
 * The value is automatically parsed from JSON.
 * @param key The key of the value to be read.
 * @returns The read value, typed as T, or null if not found or an error occurs.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error(
      `Error reading or parsing from localStorage for key "${key}":`,
      error
    )
    return null
  }
}

/**
 * Removes a value from localStorage.
 * @param key The key of the value to be removed.
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage for key "${key}":`, error)
  }
}
