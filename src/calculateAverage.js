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
    const [optionsKey, optionsValue] = (!options
      || !Object.keys(options).length)
      ? [null, null] : Object.entries(options)[0];

    let sum = 0;
    let quantity = this.length;

    for (let i = 0; i < this.length; i++) {
      const item = this[i];

      switch (optionsKey) {
        case 'propertyName':
          if (item.hasOwnProperty(optionsValue)
            && typeof item[optionsValue] === 'number') {
            sum += item[optionsValue];
          } else {
            quantity--;
          }

          break;

        case 'accumulator':
          if (typeof optionsValue !== 'function') {
            return;
          }

          sum += optionsValue(item, i, this);
          break;

        default:
          sum += item;
      }
    }

    return sum / quantity || undefined;
  };
}

module.exports = applyCalculateAverage;
