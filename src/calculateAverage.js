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
    let result = 0;
    let counter = 0;

    if ((options === null)
    || (typeof options === 'object' && typeof this[0] !== 'object')
    || (typeof options === 'object' && Object.keys(options).length === 0)) {
      return;
    }

    if (options === undefined) {
      for (let i = 0; i < this.length; i++) {
        result += this[i];
        counter++;
      }

      return result / counter;
    }

    if (options.hasOwnProperty('propertyName')) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].hasOwnProperty(options.propertyName)) {
          result += this[i][options.propertyName];
          counter++;
        }
      }

      return isNaN(result / counter) ? undefined : result / counter;
    }

    if (typeof options.accumulator === 'function') {
      for (let i = 0; i < this.length; i++) {
        result += options.accumulator(this[i], i, this);
        counter++;
      }

      return result / counter;
    }
  };
}

module.exports = applyCalculateAverage;
