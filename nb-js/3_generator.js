const infinity = (function* () {
  let i = 0;
  while (true) yield i++;
})();

console.log(infinity().next());