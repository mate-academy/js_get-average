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
      return this.reduce((sum, item) => item + sum, 0) / this.length;
    }

    if (options === null) {
      return undefined;
    }

    if (options.propertyName) {
      const value = options.propertyName;
      const listOfOptions = this.filter(item => item[value]
        && !isNaN(item[value]));

      return listOfOptions.length === 0
        ? undefined
        : listOfOptions.reduce((sum, item) => sum + item[value], 0)
          / listOfOptions.length;
    } else if (typeof options.accumulator === 'function') {
      return this.reduce((acc, item, index) => {
        return acc + options.accumulator(item, index, this);
      }, 0) / this.length;
    }
  };
}

module.exports = applyCalculateAverage;
