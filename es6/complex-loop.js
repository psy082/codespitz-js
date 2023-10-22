const loop = {
  [Symbol.iterator]() {
    return this;
  },

  *gene() {
    const data = [{ a: 6, b: "-" }, [5, 6, 7], 8, 9];
    let v;
    while ((v = this.data.shift())) {
      // switch (true) {
      //   case Array.isArray(v):
      //     this.data.unshift(...v);
      //     break;
      //   case v && typeof v == "object":
      //     for (var k in v) {
      //       console.log(k, v[k]);
      //       this.data.unshift(v[k]);
      //       console.log(this.data);
      //     }
      //     break;
      //   default:
      //     return { value: v, done: false };
      // }
      // if (!(v instanceof Object)) return { value: v }; // 이런 식의 코드는 작성하지 말자
      // if (!Array.isArray(v)) v = Object.values(v);     // 분기가 명확하게 설명이 되도록 작성하자
      // this.data.unshift(...v);
      if (!v && !(v instanceof Object)) yield v;
      else {
        if (!Array.isArray(v)) v = Object.values(v);
        data.unshift(...v);
      }
    }
    return { done: true };
  }
};

const copy = loop;
let value = copy[Symbol.iterator]();
value = copy[Symbol.iterator]().next();
// value = copy[Symbol.iterator]().next();
console.log(copy);
console.log(value);
