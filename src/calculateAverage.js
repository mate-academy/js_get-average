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
  function calculateAverageOfArray(array) {
    const initialObject = {
      sum: 0,
      counter: 0,
      average: 0
    };
    const arrayInformation = array.reduce((accumulator, currentValue) => {
      return {
        sum: accumulator.sum + currentValue,
        counter: accumulator.counter + 1,
        average: (accumulator.sum + currentValue) / (accumulator.counter + 1)
      };
    }, initialObject);
    return arrayInformation.average;
  }
  function calculateAverageOfArrayOfObjects(array, propertyName) {
    const propertyIsValid = array.some((item) => {
      return item[propertyName] && (typeof item[propertyName] === 'number');
    });

    if (propertyIsValid) {
      const valuesByProperty = [];
      array.forEach((item) => {
        if (item[propertyName]) {
          valuesByProperty.push(item[propertyName]);
        }
      });
      return calculateAverageOfArray(valuesByProperty);
    } else {
      return undefined;
    }
  }
  /**
   *
   * @param {Object} options - optional
   */
  [].__proto__.calculateAverage = function(options) {
    if (options === null) {
      return;
    }
    if (options === undefined) {
      return calculateAverageOfArray(this);
    }
    if (options.propertyName) {
      return calculateAverageOfArrayOfObjects(this, options.propertyName);
    }
    if (typeof (options.accumulator) === 'function') {
      const accumulatorResults = this.map((item, index, array) => {
        return options.accumulator(item, index, array);
      });
      return calculateAverageOfArray(accumulatorResults);
    }
  };
}

module.exports = applyCalculateAverage;
