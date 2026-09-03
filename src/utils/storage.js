const isBrowser = typeof window !== "undefined";

export const storage = {
  /**
   * Get data from localStorage
   */
  get(key, defaultValue = null) {
    if (!isBrowser) {
      return defaultValue;
    }

    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value);
    } catch (error) {
      console.error(`Storage get error for "${key}":`, error);

      return defaultValue;
    }
  },

  /**
   * Save data to localStorage
   */
  set(key, value) {
    if (!isBrowser) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));

      return true;
    } catch (error) {
      console.error(`Storage set error for "${key}":`, error);

      return false;
    }
  },

  /**
   * Remove data from localStorage
   */
  remove(key) {
    if (!isBrowser) {
      return false;
    }

    try {
      localStorage.removeItem(key);

      return true;
    } catch (error) {
      console.error(`Storage remove error for "${key}":`, error);

      return false;
    }
  },

  /**
   * Check whether a key exists
   */
  has(key) {
    if (!isBrowser) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  },

  /**
   * Clear all localStorage
   */
  clear() {
    if (!isBrowser) {
      return false;
    }

    try {
      localStorage.clear();

      return true;
    } catch (error) {
      console.error("Storage clear error:", error);

      return false;
    }
  },
};

export default storage;