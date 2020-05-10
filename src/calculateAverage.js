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

    if (typeof options === 'string'
      || options === null) {
      return;
    }

    if (!options) {
      sum = this.reduce((a, b) => a + b, 0);

      return sum / length;
    }

    if (options.propertyName) {
      const { propertyName } = options;

      if (!propertyName) {
        return;
      }

      if (this.every(obj => typeof obj[propertyName] !== 'number')) {
        return;
      }

      for (let i = 0; i < this.length; i++) {
        if (!this[i].hasOwnProperty(propertyName)) {
          length = length - 1;
        }

        if (this[i].hasOwnProperty(propertyName)) {
          sum += this[i][propertyName];
        }
      }

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
