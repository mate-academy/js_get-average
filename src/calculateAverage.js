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
  [].__proto__.calculateAverage = function(options) {
    switch (typeof options) {
      case 'string':
        return undefined;
      case 'object':
        return Obj.call(this);
      default:
        return this.reduce((a, b) => a + b) / this.length;
    }

    function Obj() {
      if (options === null || (isNaN(options) && typeof options !== 'object')) {
        return undefined;
      }

      const key = Object.values(options)[0];
      let iteribleValues = null;

      if (typeof key === 'function') {
        iteribleValues = this.map(key);
      } else {
        iteribleValues = this
          .map(obj => {
            return obj[key];
          })
          .filter(num => Number(num));
      }

      if (!iteribleValues.length) {
        return undefined;
      }

      return iteribleValues.reduce((a, b) => a + b) / iteribleValues.length;
    }
  };
}

module.exports = applyCalculateAverage;
