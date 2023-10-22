let map = new WeakMap(),
  element = document.querySelector('.element');

map.set(element, "Original");

let value = map.get(element);
console.log(value);

console.log(map.has(element)); // true
console.log(map.get(element)); // "Original"

map.delete(element);
console.log(map.has(element)); // false
console.log(map.get(element)); // undefined

map.set(element, "Original");

// 엘레멘트 제거
element.parentElement.removeChild(element);
element = null;

//WeakMap은 비어있는 상태