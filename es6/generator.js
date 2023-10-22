let a = [1, 2, 3, 4, 5];
for (n of a) {
  console.log(n);
}
console.info(a);
let b = a.entries().next();
console.log(b);
