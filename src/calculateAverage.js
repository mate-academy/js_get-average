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
    let sum = 0;
    let length = this.length;

    if (options === null || typeof options === 'string') {
      return;
    }

    if (options === undefined) {
      sum = this.reduce((x, y) => x + y, 0);

      return sum / length;
    }

    if (options.propertyName) {
      if (options.propertyName === undefined) {
        return;
      }

      const prop = options.propertyName;

      if (this.every(obj => typeof obj[prop] !== 'number')) {
        return;
      }

      sum = this.reduce((prev, curr, index = 0, arr) => {
        if (!curr.hasOwnProperty(prop)) {
          length = length - 1;

          return prev;
        }

        return prev + arr[index][prop];
      }, 0);

      return sum / length;
    }

    if (options.accumulator) {
      const func = options.accumulator;

      if (typeof func !== 'function') {
        return;
      }

      sum = this.map((x, i, arr) => func(x, i, arr)).reduce((x, y) => x + y, 0);

      return sum / length;
    }
  };
}

module.exports = applyCalculateAverage;
