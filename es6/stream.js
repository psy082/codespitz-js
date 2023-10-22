const Stream = class {
  static get(v) {
    return new Stream(v);
  }
  constructor(v) {
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg) {
    this.filters.push(v => gene(v, ...arg));
    console.log(this.filters.toString());
    return this;
  }

  * gene() {
    let v = this.v;
    for (const f of this.filters) {
      console.log(v);
      v = f(v);
    }
    console.log("yield gene", v);
    yield* v;
  }
};

const three = function* (data) {
  console.log(`three: ${data}`);
  for (const v of data) {
    console.log("three", three.cnt++);
    if (!(v % 3)) yield v;
  }
};
three.cnt = 0;

const even = function* (data) {
  console.log(`even: ${data.length}`);
  for (const v of data) {
    console.log("even", even.cnt++);
    if (!(v % 2)) yield v;
  }
};
even.cnt = 0;

const take = function* (data, n) {
  console.log(`take: ${data}`);
  for (const v of data) {
    console.log("take", take.cnt++);
    if (n--) yield v;
    else break;
  }
};
take.cnt = 0;

for (const v of Stream.get([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    .add(three)
    .add(even)
    .add(take, 2)
    .gene())
  console.log(v);