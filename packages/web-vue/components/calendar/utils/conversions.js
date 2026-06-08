/**
 * Converts minutes in the day to a percentage position.
 *
 * @param {Number} minutes time in minutes
 */
export const minutesToPercentage = (minutes, config) => {
  const dayRangeMinutes = config.timeTo - config.timeFrom;
  return ((minutes - config.timeFrom) * 100) / dayRangeMinutes;
};

/**
 * Converts percentage position to minutes in the day.
 *
 * @param {Number} percentage time in percentage
 */
export const percentageToMinutes = (percentage, config) => {
  const dayRangeMinutes = config.timeTo - config.timeFrom;
  return ~~((percentage * dayRangeMinutes) / 100 + config.timeFrom);
};

/**
 * Converts a pixel value to a percentage of the height of a container element.
 *
 * @param {number} y - The pixel value to be converted.
 * @param {HTMLElement} containerEl - The container element whose height is used for the conversion.
 * @returns {number} The percentage value corresponding to the pixel value.
 */
export const pxToPercentage = (y, containerEl) => {
  const containerElHeight = containerEl.clientHeight;
  return (y * 100) / containerElHeight;
};
