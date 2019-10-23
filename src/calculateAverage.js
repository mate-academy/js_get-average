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
      return (this.reduce((a, b) => a + b) / this.length);
    }
    if (options === null) {
      return undefined;
    }
    let average = 0;
    let notNumbers = 0;
    for (const key in options) {
      if (key === 'propertyName') {
        for (let i = 0; i < this.length; i++) {
          if (typeof this[i][options[key]] === 'number') {
            average += this[i][options[key]];
          } else {
            notNumbers++;
          }
        }
        if (Number.isNaN(average)) {
          return undefined;
          
          if (Number.isNaN(average / (this.length - notNumbers))) {
            return undefined;
          } else {
            return average / (this.length - notNumbers);
          }
        }
//         return Number.isNaN(average) ? undefined : Number.isNaN(average / (this.length - notNumbers)) ? undefined : average / (this.length - notNumbers);
      }
    }
    if (typeof options.accumulator === 'function') {
      const accumArray = [];
      this.map((el, index, array) => {
        accumArray.push(options.accumulator(el, index, array));
      });
      return (accumArray.reduce((a, b) => a + b) / this.length);
    }
  };
}

module.exports = applyCalculateAverage;
