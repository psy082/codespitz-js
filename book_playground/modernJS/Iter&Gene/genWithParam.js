let createIterator = function* () {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
}

let iterator = createIterator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next(4)); // { value: 6, done: false }
console.log(iterator.next(5)); // { value: 8, done: false }
console.log(iterator.next()); // { value: undefined, done: true }