'use strict';

const applyGetAverage = require('./getAverage');

applyGetAverage();

test('getAverage is added to [].__proto__', () => {
  expect([].getAverage)
    .toBeInstanceOf(Function);
});
