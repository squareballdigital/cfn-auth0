export function arrayDiff<T>(
  a: T[],
  b: T[],
  compare: (a: T, b: T) => boolean = sameValueZero,
): [a: T[], common: T[], b: T[]] {
  const onlyA: T[] = [];
  const common: T[] = [];

  for (const x of a) {
    if (b.find((y) => compare(x, y))) {
      common.push(x);
    } else {
      onlyA.push(x);
    }
  }

  const onlyB = b.filter((x) => !common.find((y) => compare(x, y)));
  return [onlyA, common, onlyB];
}

function sameValueZero(x: any, y: any): boolean {
  return x === y || (Number.isNaN(x) && Number.isNaN(y));
}
