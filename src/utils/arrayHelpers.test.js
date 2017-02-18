import { withUpdated, withInsertedBefore, moveUp, moveDown } from './arrayHelpers';

const testArray = ['a', 'b', 'c', 'd', 'e'];

describe('withUpdated', () => {
  test('updates every array element', () => {
    const cases = {
      'a': ['x', 'b', 'c', 'd', 'e'],
      'b': ['a', 'x', 'c', 'd', 'e'],
      'c': ['a', 'b', 'x', 'd', 'e'],
      'd': ['a', 'b', 'c', 'x', 'e'],
      'e': ['a', 'b', 'c', 'd', 'x'],
    };

    Object.entries(cases).forEach(([ replace, expected ]) => {
      expect(withUpdated(
        testArray,
        el => el === replace,
        el => 'x',
      )).toEqual(expected);
    });
  });

  test('does not mutate the input array', () => {
    withUpdated(
      testArray,
      el => el === 'c',
      el => 'x',
    );
    expect(testArray).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('returns an unchanged array if the selector does not match', () => {
    expect(withUpdated(
      testArray,
      el => el === 'foo',
      el => 'x',
    )).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('withInsertedBefore', () => {
  test('inserts before every array element', () => {
    const cases = {
      'a': ['x', 'a', 'b', 'c', 'd', 'e'],
      'b': ['a', 'x', 'b', 'c', 'd', 'e'],
      'c': ['a', 'b', 'x', 'c', 'd', 'e'],
      'd': ['a', 'b', 'c', 'x', 'd', 'e'],
      'e': ['a', 'b', 'c', 'd', 'x', 'e'],
    };

    Object.entries(cases).forEach(([ selected, expected ]) => {
      expect(withInsertedBefore(
        testArray,
        el => el === selected,
        'x',
      )).toEqual(expected);
    });
  });

  test('does not mutate the input array', () => {
    withInsertedBefore(
      testArray,
      el => el === 'c',
      'x',
    );
    expect(testArray).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('returns an unchanged array if the selector does not match', () => {
    expect(withInsertedBefore(
      testArray,
      el => el === 'foo',
      'x',
    )).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('moveUp', () => {
  test('moves up every array element', () => {
    const cases = {
      'a': ['a', 'b', 'c', 'd', 'e'],
      'b': ['b', 'a', 'c', 'd', 'e'],
      'c': ['a', 'c', 'b', 'd', 'e'],
      'd': ['a', 'b', 'd', 'c', 'e'],
      'e': ['a', 'b', 'c', 'e', 'd'],
    };

    Object.entries(cases).forEach(([ replace, expected ]) => {
      expect(moveUp(
        testArray,
        el => el === replace
      )).toEqual(expected);
    });
  });

  test('does not mutate the input array', () => {
    moveUp(
      testArray,
      el => el === 'c',
    );
    expect(testArray).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('returns an unchanged array if the selector does not match', () => {
    expect(moveUp(
      testArray,
      el => el === 'foo'
    )).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('moveDown', () => {
  test('moves down every array element', () => {
    const cases = {
      //'a': ['b', 'a', 'c', 'd', 'e'],
      'b': ['a', 'c', 'b', 'd', 'e'],
      'c': ['a', 'b', 'd', 'c', 'e'],
      'd': ['a', 'b', 'c', 'e', 'd'],
      'e': ['a', 'b', 'c', 'd', 'e'],
    };

    Object.entries(cases).forEach(([ replace, expected ]) => {
      expect(moveDown(
        testArray,
        el => el === replace
      )).toEqual(expected);
    });
  });

  test('does not mutate the input array', () => {
    moveDown(
      testArray,
      el => el === 'c',
    );
    expect(testArray).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('returns an unchanged array if the selector does not match', () => {
    expect(moveDown(
      testArray,
      el => el === 'foo'
    )).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});