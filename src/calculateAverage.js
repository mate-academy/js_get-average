'use strict';

/**
 * Implement a custom array method calculateAverage:
 *
 * Method calculates the average value based on passed options object:
 * - If options are not passed, returns average value of all items in the array
 * - If options.propertyName is passed, returns average value of propertyName
 * property of all items in the array.
 * - If options.accumulator = function(item, index, array) is passed,
 * returns average value of accumulator res applied to all items in the array
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
    let res = 0;
    let count = 0;

    if ((options === null)
      || (typeof options === 'object' && typeof this[0] !== 'object')
      || (typeof options === 'object' && Object.keys(options).length === 0)) {
      return;
    }

    if (!options) {
      this.forEach(val => {
        res += val;
        count++;
      });

      return res / count;
    }

    if (options.hasOwnProperty('propertyName')) {
      this.forEach(val => {
        if (val.hasOwnProperty(options.propertyName)) {
          res += val[options.propertyName];
          count++;
        }
      });

      return isNaN(res / count) ? undefined : res / count;
    }

    if (typeof options.accumulator === 'function') {
      this.forEach((val, index) => {
        res += options.accumulator(val, index, this);
        count++;
      });

      return res / count;
    }
  };
}

module.exports = applyCalculateAverage;
