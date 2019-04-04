'use strict';

const applyGetAverage = require('./getAverage');
const users = [
  { id: 1, age: 10 },
  { id: 2, age: 20 },
  { id: 3, age: 60 }
];

applyGetAverage();

test('getAverage is added to [].__proto__', () => {
  expect([].getAverage)
    .toBeInstanceOf(Function);
});

test('for average value', () => {
  expect([1, 2, 6].getAverage())
    .toBe(3);
});

test('for average "age"', () => {
  expect(users.getAverage('age'))
    .toBe(30);
});

test('average callback result', () => {
  expect(users.getAverage((user, index) => user.id + (index * 100)))
    .toBe(102);
});

test('original array is not changed', () => {
  expect(users)
    .toEqual([
      { id: 1, age: 10 },
      { id: 2, age: 20 },
      { id: 3, age: 60 }
    ]);
});
