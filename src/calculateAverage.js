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
    if (options === null) {
      return undefined;
    }

    if (options === undefined) {
      return this.reduce((sum, elem) => sum + elem) / this.length;
    } else if (options['propertyName'] && this[0][options.propertyName]) {
      let sum = 0;
      let objCounter = 0;

      for (const obj of this) {
        if (obj[options.propertyName]) {
          sum += obj[options.propertyName];
          objCounter++;
        }
      }

      return sum / objCounter;
    } else if (options.accumulator
        && typeof options.accumulator === 'function') {
      const func = options.accumulator;
      let sum = 0;

      for (let i = 0; i < this.length; i++) {
        sum += func(this[i], i, this);
      }

      return sum / this.length;
    } else {
      return undefined;
    }
  };
}

module.exports = applyCalculateAverage;
