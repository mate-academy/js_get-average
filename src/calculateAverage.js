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
  [].__proto__.calculateAverage = function(callback) {
    let average = 0;
    let sum = 0;

    if (arguments.length < 1 || callback === undefined) {
      average = this.reduce((a, b) => a + b) / this.length;
      return average;
    }

    if (callback === null) {
      return;
    }

    let value = Object.values(callback);
    if (typeof value[0] === 'function') {
      for (let i = 0; i < this.length; i++) {
        sum += value[0](this[i], i, this);
      }
      return sum / this.length;
    }

    if (typeof callback === 'object') {
      value = Object.values(callback).toString();
      const arrayOfValues = [];
      for (const item of this) {
        if (item.hasOwnProperty(value)) {
          arrayOfValues.push(item[value]);
        } else {
          continue;
        }
      }
      if (arrayOfValues.length < 1 || !arrayOfValues) {
        return;
      }

      average = arrayOfValues.reduce((a, b) => a + b) / arrayOfValues.length;
      if (!average) {
        return;
      }
      return average;
    }
  };
}

module.exports = applyCalculateAverage;
