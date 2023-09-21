export function transpose(a) {
  return Object.keys(a[0]).map(function(c) {
      return a.map(function(r) { return r[c]; });
  });
}

export function getDiagonals(a) {
  const newArr = [[], []];

  for (let i = 0; i < a.length; i++) {
    newArr[0].push(a[i][i]);
    newArr[1].push(a[i][a.length - i - 1]);
  }

  return newArr;
}