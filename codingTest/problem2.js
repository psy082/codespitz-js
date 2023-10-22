let instance1 = {
  x: 0,
  y: 0,
  set($x, $y) {
    this.x = $x;
    this.y = $y;
    return this;
  }
}

console.log(instance1.set(200, 200));
console.log(instance1);