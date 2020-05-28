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
    if (typeof options === 'undefined') {
      let sum = 0;
      for (let i = 0; i < this.length; i += 1) {
        sum += this[i];
      }
      return sum / this.length;
    }
    if (typeof options === 'object' && !Array.isArray(options) && options) {
      const { propertyName, accumulator } = options;
      if (typeof accumulator === 'function') {
        let count = 0;
        let sum = 0;
        for (let i = 0; i < this.length; i += 1) {
          count += 1;
          sum += accumulator(this[i], i, this);
        }
        return sum / count;
      }
      if (typeof propertyName !== 'undefined') {
        let count = 0;
        let sum = 0;
        for (let i = 0; i < this.length; i += 1) {
          if (!isNaN(this[i][propertyName])) {
            count += 1;
            sum += this[i][propertyName];
          }
        }
        if (count > 0) {
          return sum / count;
        }
      }
    }
    return undefined;
  };
}

module.exports = applyCalculateAverage;
