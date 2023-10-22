let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5)); // true

set.delete(5);

console.log(set.has(5)); // false
console.log(set.size); // 1

set.clear();

console.log(set.has("5")); // false
console.log(set.size); // 0