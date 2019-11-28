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
    let userArr = [...this];

    if (typeof options === 'object'
        && options !== null
        && options.hasOwnProperty('propertyName')) {
      userArr = this.filter(el => typeof el === 'object'
                            && el.hasOwnProperty(options.propertyName)
                            && typeof el[options.propertyName] === 'number');

      if (userArr.length === 0) {
        return;
      }
      userArr = userArr.map(el => el[options.propertyName]);
    } else if (typeof options === 'object'
              && options !== null
              && options.hasOwnProperty('accumulator')
              && typeof options.accumulator === 'function') {
      userArr = userArr.map((el, i) => options.accumulator(el, i, this));
    }

    if (typeof userArr[0] !== 'number') {
      return;
    }
    return Math.floor(userArr.reduce((s, el) => s + el, 0) / userArr.length);
  };
}

module.exports = applyCalculateAverage;
