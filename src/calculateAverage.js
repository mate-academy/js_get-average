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
      return this.reduce((a, b) => a + b) / this.length;
    } else if (options === null
      || typeof (options) === 'string'
      || typeof (options.accumulator) === 'string'
      || options.length > 1) {
      return undefined;
    } else {
      let sum = 0;
      let counter = 0;

      for (let i = 0; i < this.length; i++) {
        if (options.accumulator !== undefined
          && typeof (options.accumulator) === 'function') {
          sum += options.accumulator(this[i], i, this);
          counter++;
        }

        if (options.propertyName !== undefined
          && this[i][options.propertyName] !== undefined) {
          if (typeof (this[i][options.propertyName]) !== 'number') {
            return undefined;
          } else {
            sum += this[i][options.propertyName];
            counter++;
          }
        }
      }

      return (counter > 0) ? sum / counter : undefined;
    }
  };
}

module.exports = applyCalculateAverage;
