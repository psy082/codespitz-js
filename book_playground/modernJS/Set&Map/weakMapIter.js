let key1 = {},
  key2 = {},
  map = new WeakMap([
    [key1, "Hello"],
    [key2, 42]
  ]);

for (let item of map) console.log(item); // map is not iterable