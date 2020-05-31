'use strict';

/**
 * Implement a custom array method calculateAverage:
 *
 * Method calculates the average value based on passed options object:
 * - If options are not passed, returns average value of all items in the array
 * - If options.propertyName is passed, returns average value of propertyName
 * property of all items in the array.
 * - If options.accumulator = function(item, index, array) is passed,
 * returns average value of accumulator result applied to all items in the array
 *
 * [1, 2, 6].calculateAverage() === 3
 * [1, 2, 6].calculateAverage({propertyName: 'name'}) === undefined
 * [1, 2, 6].calculateAverage(['options', 'as', 'array']) === undefined
 * [1, 2, 6].calculateAverage(null) === undefined
 * [1, 2, 6].calculateAverage('options as string') === undefined
 *
 * const users = [
 *  { id: 1, age: 10 },
 *  { id: 2, age: 20 },
 *  { id: 3, age: 60 },
 * ]
 *
 * users.calculateAverage({propertyName: 'id'}) === 2
 * users.calculateAverage({propertyName: 'name'}) === undefined
 * users.calculateAverage({}) === undefined
 * users.calculateAverage({
 *  accumulator: (user, index, array) => user.age + (index * 100)
 * }) === 130
 * users.calculateAverage({ accumulator: 'hello world' }) === undefined
 *
 */
function applyCalculateAverage() {
  /**
   *
   * @param {Object} options - optional
   */
  [].__proto__.calculateAverage = function(options) {
    if (arguments.length === 0 || options === undefined) {
      return (this.reduce((a, b) => a + b, 0) / this.length);
    }
    if (typeof options === 'object' && options !== null) {
      if (options.propertyName) {
        const property = options.propertyName;
        const normalized = this.filter(item => item.hasOwnProperty(property)
          && isFinite(item[property]));
        if (normalized.length === 0) {
          return undefined;
        }
        return (normalized.reduce(
          (prev, cur) => (prev + cur[property])
          , 0) / normalized.length);
      } else if (options.accumulator
        && typeof options.accumulator === 'function') {
        return (this.map(options.accumulator).reduce(
          (a, b) => a + b
          , 0) / this.length);
      }
    }
    return undefined;
  };
}

module.exports = applyCalculateAverage;
