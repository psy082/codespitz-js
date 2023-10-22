const counter1 = (() => {
  let _count = 0;

  return () => {
    return _count += 1;
  }
})();

console.log(counter1());
console.log(counter1());

const counterFactory = () => {
  let _count = 0;

  return () => {
    _count += 1;

    return _count;
  }
}

const counter = counterFactory();

const app1 = {
  counter: counterFactory()
}

const app2 = {
  counter: counterFactory()
}

console.log(app1.counter())
console.log(app1.counter())
console.log(app2.counter())