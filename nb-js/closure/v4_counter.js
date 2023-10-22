const counterFactory = () => {
  let _count = 0;

  const count = value => {
    _count = value || _count;
    return _count;
  }

  return {
    count: count,
    inc: () => {
      return count(count() + 1);
    },
    dec: () => {
      return count(count() - 1);
    }
  };
}

const counter = counterFactory();

console.log(counter.inc());
console.log(counter.inc());
console.log(counter.dec());
console.log(counter.count());

const counterFactoryExt = () => {
  const counter = counterFactory();
  const count = counter.count;

  counter.inc = () => {
    return count(count() + 2);
  }

  return counter;
}

const counterExt = counterFactoryExt();

console.log(counterExt.inc());
console.log(counterExt.inc());
console.log(counterExt.inc());
console.log(counterExt.dec());