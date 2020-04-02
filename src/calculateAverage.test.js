'use strict';

const applyCalculateAverage = require('./calculateAverage');
const users = [
  {
    id: 1, age: 10, likes: 200,
  },
  {
    id: 2, age: 20, likes: 100,
  },
  {
    id: 3, age: 60, name: 'John',
  },
];

applyCalculateAverage();

test('calculateAverage is added to [].__proto__', () => {
  expect([].calculateAverage)
    .toBeInstanceOf(Function);
});

test('for average value', () => {
  expect([1, 2, 6].calculateAverage())
    .toBe(3);
});

test('for average value', () => {
  expect([1, 2, 6].calculateAverage(undefined))
    .toBe(3);
});

test('with passed options, simple array', () => {
  expect([1, 2, 6].calculateAverage({ propertyName: 'name' }))
    .toBe(undefined);
});

test('with passed options: array with objects', () => {
  expect(users.calculateAverage({ propertyName: 'age' }))
    .toBe(30);
});

test('with passed options: array with objects', () => {
  expect(users.calculateAverage({ propertyName: 'likes' }))
    .toBe(150);
});

test('with passed options: array with objects, wrong property name', () => {
  expect(users.calculateAverage({ propertyName: 'surname' }))
    .toBe(undefined);
});

test('with passed options: array with objects, wrong property type', () => {
  expect(users.calculateAverage({ propertyName: 'name' }))
    .toBe(undefined);
});

test('with passed options: options as array', () => {
  expect(users.calculateAverage(['options', 'as', 'array']))
    .toBe(undefined);
});

test('with passed options: options as null', () => {
  expect(users.calculateAverage(null))
    .toBe(undefined);
});

test('with passed options: options as string', () => {
  expect(users.calculateAverage('options as string'))
    .toBe(undefined);
});

test('with passed options: options as empty object', () => {
  expect(users.calculateAverage({}))
    .toBe(undefined);
});

test('average callback result', () => {
  expect(
    users.calculateAverage({
      accumulator: (user, index) => user.id + index * 100,
    }))
    .toBe(102);
});

test('average callback result, check array to be equal with source', () => {
  expect(
    users.calculateAverage({
      accumulator: (user, index, array) => {
        if (array === users) {
          return user.id + (index * 100);
        }
      },
    }))
    .toBe(102);
});

test('average callback result, wrong callback', () => {
  expect(
    users.calculateAverage({ accumulator: 'hello world' }))
    .toBe(undefined);
});

test('original array is not changed', () => {
  expect(users)
    .toEqual([
      {
        id: 1, age: 10, likes: 200,
      },
      {
        id: 2, age: 20, likes: 100,
      },
      {
        id: 3, age: 60, name: 'John',
      },
    ]);
});
