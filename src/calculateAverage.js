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
 */
function applyCalculateAverage() {
  [].__proto__.calculateAverage = function(options) {
    if (options === null) {
      return undefined;
    }
    if (options) {
      if (!Object.keys(options).length) {
        return undefined;
      } else if (typeof options === 'object' &&
          options.hasOwnProperty('propertyName')) {
        let filterArr = this.filter(item => item[options.propertyName]);
        if (filterArr.length) {
          if (filterArr.some(item => isNaN(item[options.propertyName]))) {
            return;
          }
          let propAmount = this.filter(item => item[options.propertyName]);
          return filterArr.reduce((sum, current) =>
            sum + current[options.propertyName], 0) / propAmount.length;
        }
      } else if (typeof options === 'object' &&
          options.hasOwnProperty('accumulator')) {
        if (typeof options.accumulator === 'function') {
          return this.reduce((sum, current, array) => {
            current = options.accumulator(current, this.indexOf(current), this);
            return (sum + current);
          }, 0) / this.length;
        };
      }
    }

    if (!options) {
      return (this.reduce((sum, current) => sum + current, 0)) / this.length;
    }
  };
}

module.exports = applyCalculateAverage;
