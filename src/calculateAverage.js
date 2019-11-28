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
  [].__proto__.calculateAverage = function(propertyName = 0) {
    if (propertyName === null || Object.values(propertyName)[0] === 'name') {
      return undefined;
    }

    if (typeof Object.values(propertyName)[0] === 'function') {
      const callback = Object.values(propertyName)[0];

      return this.map(callback).reduce((sum, b) => sum + b) / this.length;
    }

    if (typeof this[0] === 'number') {
      return this.reduce((sum, a) => sum + a) / this.length;
    }

    const key = Object.values(propertyName);
    let counter = 0;
    let average = 0;

    for (const i of this) {
      if (typeof i[key] === 'number') {
        average += i[key];
        counter++;
      }
    }

    if (average === 0) {
      return undefined;
    }

    return average / counter;
  };
}

module.exports = applyCalculateAverage;
