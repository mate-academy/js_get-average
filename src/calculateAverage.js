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
      return;
    }

    if (Array.isArray(this) && typeof this[0] !== 'object') {
      if (arguments.length === 0 || options === undefined) {
        return this.reduce((acc, cur) => acc + cur) / this.length;
      }
    }

    if (options && options.hasOwnProperty('accumulator')) {
      if (typeof options['accumulator'] !== 'function') {
        return;
      }

      let sum = 0;

      for (let i = 0; i < this.length; i++) {
        sum += options.accumulator(this[i], i, this);
      }

      return sum / this.length;
    }

    if (Array.isArray(this) && typeof this[0] === 'object') {
      if (typeof options === 'object') {
        let sum = 0;
        let count = 0;
        let pass = 0;

        for (const key in this) {
          if (
            this[key].hasOwnProperty(options['propertyName'])
            && typeof this[key][options['propertyName']] === 'number'
          ) {
            sum += this[key][options['propertyName']];
            count++;
            pass = 1;
          }
        }

        if (pass === 0) {
          return;
        }

        return sum / count;
      }
    }
  };
}

module.exports = applyCalculateAverage;
