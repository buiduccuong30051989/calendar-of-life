/**
 * Get a random item from an array or object
 * @param {Array|Object} data - Array or object to select from
 * @returns {*} - Random item
 */
export const getRandomItem = (data) => {
  if (Array.isArray(data)) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return data[keys[randomIndex]];
  }

  throw new Error('Invalid data type. Expected an array or an object.');
};

/**
 * Format a date for display
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDisplayDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};
