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
    // write code here
    if (!isNaN(this[0])) {
      if (options === undefined) {
        return this.reduce((sum, item) => sum + item, 0) / this.length;
      }
    } else {
      if (!options) {
        return undefined;
      }

      let property;
      let counterOfNaN = 0;

      if (options['propertyName'] in this[0]) {
        property = options['propertyName'];

        return this.reduce((sum, item) => {
          if (!isNaN(item[property])) {
            return item[property] + sum;
          } else {
            counterOfNaN++;
            return sum;
          }
        }, 0) / (this.length - counterOfNaN);
      } else if (options['accumulator']) {
        property = options['accumulator'];
        let sum = 0;

        if (typeof property !== 'function') {
          return undefined;
        }
        for (let i = 0; i < this.length; i++) {
          sum += options['accumulator'](this[i], i, this);
        }

        return sum / this.length;
      }
    }
  };
}

module.exports = applyCalculateAverage;
