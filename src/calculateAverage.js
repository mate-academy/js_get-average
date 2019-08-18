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
    let sumOfValues = 0;
    let countNotExistValues = 0;
    let isAtLeastOneProp = false;
    const processingAccumulator = (callback) => {
      sumOfValues = this.reduce(
        (sum, user, index, array) => {
          return sum + callback(user, index, array);
        }
        , 0);

      return sumOfValues / this.length;
    };

    if (typeof options === 'string'
        || options === null
        || Array.isArray(options)) {
      return;
    }

    if (options === undefined || options.length === 0) {
      sumOfValues = this.reduce(
        (sum, item) => sum + item, 0
      );

      return sumOfValues / this.length;
    }

    if (typeof options === 'object') {
      if (Object.keys(options) === 0) {
        return;
      }
      if (options.hasOwnProperty('propertyName')) {
        this.forEach(
          (item) => {
            if (item.hasOwnProperty(options['propertyName'])
                && typeof item[options['propertyName']] === 'number') {
              isAtLeastOneProp = true;
            }
          }
        );
        if (!isAtLeastOneProp) {
          return;
        }
        sumOfValues = this.reduce(
          (sum, item) => {
            if (item.hasOwnProperty(options['propertyName'])) {
              return sum + item[options['propertyName']];
            } else {
              countNotExistValues++;

              return sum;
            }
          }
          , 0);

        return sumOfValues / (this.length - countNotExistValues);
      }
      if (options.hasOwnProperty('accumulator')) {
        if (typeof options['accumulator'] !== 'function') {
          return;
        }

        return processingAccumulator(options['accumulator']);
      }
    }
  };
}

module.exports = applyCalculateAverage;
