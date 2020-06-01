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
    if (arguments.length === 0 || options === undefined) {
      return Math.round(this.reduce((acc, item) => acc + item) / this.length);
    };

    if (!isNaN(options)) {
      return undefined;
    }

    const calculate = [];
    if (typeof options.accumulator === 'function') {
      for (let i = 0; i < this.length; i++) {
        calculate.push(options.accumulator(this[i], i, this));
      };
    };

    for (const i of this) {
      if (typeof i[options.propertyName] === 'number') {
        calculate.push(i[options.propertyName]);
      };
    };

    if (calculate.length === 0) {
      return undefined;
    }

    return Math.round(calculate
      .reduce((acc, item) => acc + item) / calculate.length);
  };
};

module.exports = applyCalculateAverage;
