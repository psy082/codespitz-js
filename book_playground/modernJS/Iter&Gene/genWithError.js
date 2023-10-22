let createIterator = function* () {
  let first = yield 1;
  let second

  try {
    second = yield first + 2;
  } catch (ex) {
    // console.log(ex);
    second = 6;
  }
  yield second + 3;
}

let iterator = createIterator(); // 실행시 첫번째 yield 키워드 전까지 실행된다.
// next()함수 실행시 yield 키워드 뒤에 있는 값을 return 한다.

console.log(iterator.next())
console.log(iterator.next(4))
console.log(iterator.throw(new Error("Boom")));