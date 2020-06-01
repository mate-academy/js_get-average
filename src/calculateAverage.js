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
    if (options === undefined) {
      return this.reduce((a, c) => a + c, 0) / this.length;
    } else if (typeof options === 'string' || options === null) {
      return undefined;
    }

    const property = options.propertyName;
    const itemsSum = options.accumulator
    || ((sum, current) => sum + current[property]);
    let average;

    if (!this.some((el) => el.hasOwnProperty(property)) && property) {
      return undefined;
    } else if (this.every((el) => el.hasOwnProperty(property)) && property) {
      return this.reduce(itemsSum, 0) / this.length;
    } else if (this.some((el) => el.hasOwnProperty(property)) && property) {
      const filteredItems = this.filter(el => el.hasOwnProperty(property));

      average = filteredItems.reduce(itemsSum, 0) / filteredItems.length;

      return !Number.isNaN(average) ? average : undefined;
    } else if (options.accumulator) {
      if (typeof options.accumulator !== 'function') {
        return undefined;
      }
      average = this.map(options.accumulator);

      return average.reduce((a, c) => a + c, 0) / average.length;
    }
  };
}

module.exports = applyCalculateAverage;
