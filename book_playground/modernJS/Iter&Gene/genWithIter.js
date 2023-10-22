let arr1 = [];
for (let i = 0; i < 60; i++) {
  arr1.push(i + 1);
}
let arr2 = [];
for (let i = 0; i < 40; i++) {
  arr2.push(i + 1);
}

let gene = function* (arr1, arr2) {
  for (let i = 0; i < 10; i++) {
    yield arr1.splice(arr1.length - 3, arr1.length);
    yield arr2.splice(arr2.length - 2, arr2.length);
    yield arr1.splice(arr1.length - 3, arr1.length);
    yield arr2.splice(arr2.length - 1, arr2.length);
  }
}