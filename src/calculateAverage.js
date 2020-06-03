'use strict';

/**
 * Implement a custom array method calculateAverage:
 *
 * Method calculates the average value based on passed options object:
 * - If options are not passed, returns average value of all items in the array
 * - If options.propertyName is passed, returns average value of propertyName
 * property of all items in the array.
 * - If options.sum = function(item, index, array) is passed,
 * returns average value of sum result applied to all items in the array
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
 *  sum: (user, index, array) => user.age + (index * 100)
 * }) === 130
 * users.calculateAverage({ sum: 'hello world' }) === undefined
 *
 */
function applyCalculateAverage() {
  /**
   *
   * @param {Object} options - optional
   */
  [].__proto__.calculateAverage = function(options) {
    let sum = 0;
    let number = this.length;

    if (options === null) {
      return undefined;
    }

    if (options !== undefined
      && options.hasOwnProperty('accumulator')
      && typeof (options.accumulator) === 'function') {
      for (let i = 0; i < this.length; i++) {
        sum += options.accumulator(this[i], i, this);
      }

      return sum / number;
    }

    if (options === undefined) {
      for (let i = 0; i < this.length; i++) {
        sum += this[i];
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        (this[i].hasOwnProperty(options.propertyName))
          ? sum += this[i][options.propertyName]
          : number--;
      }
    }

    return sum / number || undefined;
  };
}

module.exports = applyCalculateAverage;
