'use strict';

/**
 * Implement a custom array method getAverage:
 *
 * Method works in different ways:
 * - without arguments: calculates average value in array (sum of elements
 * divided by array length)
 *
 * - with string argument: calculates average value of objects in array where
 * property is a given string
 *
 * - with function argument: calculates average value of results of given
 * function
 *
 * [1, 2, 6].getAverage() === 3
 *
 * const users = [
 *  { id: 1, age: 10 },
 *  { id: 2, age: 20 },
 *  { id: 3, age: 60 },
 * ]
 *
 * users.getAverage('id') === 2
 * users.getAverage((user, index) => user.age + (index * 100)) === 130
 *
 */
function applyGetAverage() {
  [].__proto__.getAverage = function() {
    // write code here
  };
}

module.exports = applyGetAverage;
