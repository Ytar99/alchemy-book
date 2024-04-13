export function isArraysEqual(arrayA, arrayB) {
  const a = [...arrayA];
  const b = [...arrayB];

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}

export function isArraysEqualSort(arrayA, arrayB) {
  const a = [...arrayA];
  const b = [...arrayB];

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function containsAllElements(array, target) {
  return target.every((element) => array.includes(element));
}
