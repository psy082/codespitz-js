// 일회용 카운터
const counter = {
  _count: 0,
  count: function () {
    return this._count += 1;
  }
}

console.log(counter.count());
console.log(counter.count());