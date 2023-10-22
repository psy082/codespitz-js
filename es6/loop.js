// iterator interface
const N2 = class {
  constructor(max) {
      this.max = max;
    }
    [Symbol.iterator]() {
      // iterable object which return iterator object
      let cursor = 0,
        max = this.max;
      return {
        done: false,
        next: () => {
          // iterator object which return IteratorResultObject => (done, value)
          if (cursor > max) {
            this.done = true;
          } else {
            this.value = cursor * cursor;
            cursor++;
          }
          return this; // this is both iterator object and iteratorResultObject
        }
      };
    }
};

const N3 = class {
  constructor() {
    this.data = [1, 2, 3, 4];
  }

  [Symbol.iterator]() {
    const data = JSON.parse(JSON.stringify(this.data));
    return {
      next() {
        return {
          done: data.length == 0,
          value: data.shift()
        };
      }
    };
  }
};

// logically equal
const generator = function* (max) {
  let cursor = 0;
  while (cursor < max) {
    yield cursor * cursor;
    cursor++;
  }
};

const Ten = generator(10);
console.log(Ten.next());
console.log(Ten.next());
console.log(Ten.next());
console.log(Ten.next());
console.log(Ten.next());
console.log(Ten);
// console.log(...Ten);