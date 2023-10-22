let colors = ["red", "green", "blue"];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");


console.log("print all entries")
for (let entry of colors.entries()) {
  console.log(entry);
}

for (let entry of tracking.entries()) {
  console.log(entry);
}

for (let entry of data.entries()) {
  console.log(entry);
}

console.log(`${'-'.repeat(50)}`);
console.log("print all values")
for (let entry of colors.values()) {
  console.log(entry);
}

for (let entry of tracking.values()) {
  console.log(entry);
}

for (let entry of data.values()) {
  console.log(entry);
}

console.log(`${'-'.repeat(50)}`);
console.log("print all keys")
for (let entry of colors.keys()) {
  console.log(entry);
}

for (let entry of tracking.keys()) {
  console.log(entry);
}

for (let entry of data.keys()) {
  console.log(entry);
}