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
      return this.reduce((acum, num) => acum + num, 0) / this.length;
    } else {
      for (const key in options) {
        if (key === 'propertyName') {
          let counter = 0;
          const sumOptions = options[key] === undefined
            ? undefined
            : this.reduce((acum, num) => {
              typeof num[options[key]] === 'number' && counter++;
              return typeof num[options[key]] === 'number'
                ? acum + num[options[key]]
                : acum;
            }, 0);

          return sumOptions === 0 || sumOptions === undefined
            ? undefined
            : sumOptions / counter;
        } else if (key === 'accumulator'
        && typeof options[key] === 'function') {
          return this.reduce((acum, num, index) => {
            return acum + options[key](num, index, this);
          }, 0) / this.length;
        }
      }
    }
  };
}

module.exports = applyCalculateAverage;
