const routine = ({ a, b, ...rest }) => rest;
const copy = ({ ...rest }) => rest;
const ref = { a: 3, b: 4, c: 5, d: 6 };
const a = copy(ref);
console.log(ref);
console.log(a);
console.log(a === ref);