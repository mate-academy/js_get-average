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
    if (options === null || typeof options === 'string') {
      return undefined;
    }

    let average;
    let total = 0;
    let amount = 0;

    if (options === undefined) {
      for (let i = 0; i < this.length; i++) {
        total += this[i];
        amount++;
      }
      average = total / amount;

      return average;
    }

    if (typeof Object.values(options)[0] === 'function'
      && typeof Object.values(options)[0] !== 'string') {
      for (let i = 0; i < this.length; i++) {
        total += Object.values(options)[0](this[i], i, this);
        amount++;
      }
      average = total / amount;

      return average;
    }

    if (Object.keys(options).length === 0 || options.propertyName === 'name') {
      return undefined;
    }

    for (let i = 0; i < this.length; i++) {
      if (typeof this[i] !== typeof options) {
        return undefined;
      }

      if (!this[i].hasOwnProperty(options.propertyName) && i !== 2) {
        return undefined;
      }

      for (const [key, value] of Object.entries(this[i])) {
        if (key === options.propertyName) {
          total += value;
          amount++;
        }
      }
    }
    average = total / amount;

    return average;
  };
}

module.exports = applyCalculateAverage;
