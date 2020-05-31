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
    // write code here
    let optionsKey;
    let optionsValue;

    if (options === undefined) {
      return avg(this);
    } else if (options === null) {
      return undefined;
    } else if (Array.isArray(options)) {
      return undefined;
    } else if (typeof options === 'object') {
      optionsKey = Object.keys(options)[0];
      optionsValue = options[optionsKey];
    } else {
      return undefined;
    }

    switch (optionsKey) {
      case undefined:
        return undefined;
      case 'propertyName':
        return avgObjProperty(optionsValue, this);
      case 'accumulator':
        return avgCallback(optionsValue, this);
    }

    function avg(arr) {
      let sum = 0;

      for (const el of arr) {
        sum += el;
      }

      return sum / arr.length;
    }

    function avgObjProperty(keyProperty, arrWithObj) {
      let sum = 0;
      let count = 0;

      for (const obj of arrWithObj) {
        if (typeof obj !== 'object') {
          return undefined;
        } else if (obj[keyProperty] === undefined) {
          continue;
        } else if (typeof obj[keyProperty] !== 'number') {
          return undefined;
        } else {
          sum += obj[keyProperty];
          count += 1;
        }
      }

      if (count === 0) {
        return undefined;
      }

      return sum / count;
    }

    function avgCallback(callBack, arrWithObj) {
      if (({}).toString.call(callBack) !== '[object Function]') {
        return undefined;
      }

      let sum = 0;

      for (let i = 0; i < arrWithObj.length; i++) {
        sum += callBack(arrWithObj[i], i, arrWithObj);
      }

      return sum / arrWithObj.length;
    }
  };
}

module.exports = applyCalculateAverage;
