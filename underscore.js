const _ = require('underscore');

const input = [1, "A", 2, "B", 3, "C", 4, "A", 5, "C", 6, "D"];

const [key, value] = _.partition(input, isNaN);
const output = {};
for(let i = 0; i < key.length; i++) {
  if(output.hasOwnProperty(key[i])) output[key[i]].push(value[i]);
  else output[key[i]] = [value[i]];
}
console.log(output);