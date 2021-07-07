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
      return (this.reduce((a, b) => a + b, 0)) / this.length;
    }

    if (options === null) {
      return undefined;
    }

    if (options.propertyName) {
      const propertyArr = this.filter(num =>
        typeof num[options.propertyName] === 'number');
      const result = (propertyArr.reduce((a, b) => {
        return a + b[options.propertyName];
      }, 0)) / propertyArr.length;

      return result ? result : undefined;
    }

    if (typeof options.accumulator === 'function') {
      let summ = 0;
      
      for (let i = 0; i < this.length; i++) {
        summ += options.accumulator(this[i], i, this);
      }

      return summ / this.length;
    }
  };
}

module.exports = applyCalculateAverage;
