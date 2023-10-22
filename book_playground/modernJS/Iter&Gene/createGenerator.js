let o = {
  items: [1, 2, 3],
  * createIterator() {
    for (let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }
  }
}

let iterator = o.createIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());