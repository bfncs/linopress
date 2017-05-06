export const withUpdated = (arr, select, update) =>
  arr.map(el => (select(el) ? update(el) : el));

export const withInsertedBefore = (arr, selectBefore, element) => {
  const reference = arr.findIndex(selectBefore);

  if (reference < 0) {
    return arr;
  }

  if (reference === 0) {
    return [element, ...arr];
  }

  return [].concat(
    arr.slice(0, reference),
    element,
    arr.slice(reference, arr.length)
  );
};

export const moveUp = (arr, select) => {
  const pos = arr.findIndex(select);
  if (pos <= 0) {
    return arr;
  }
  return arr.map((el, idx) => {
    if (idx === pos - 1) {
      return arr[idx + 1];
    } else if (idx === pos) {
      return arr[idx - 1];
    } else {
      return el;
    }
  });
};

export const moveDown = (arr, select) => {
  const pos = arr.findIndex(select);
  if (pos < 0 || pos >= arr.length - 1) {
    return arr;
  }
  return arr.map((el, idx) => {
    if (idx === pos + 1) {
      return arr[idx - 1];
    } else if (idx === pos) {
      return arr[idx + 1];
    } else {
      return el;
    }
  });
};
