let map = new Map([
  ["name", "Nicholas"],
  ["age", 25]
]);

map.forEach((value, key, ownerMap) => {
  console.log(key + " " + value);
  console.log(ownerMap === map);
})