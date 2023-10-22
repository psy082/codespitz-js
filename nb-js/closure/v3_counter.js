const counterFactoryMaker = (incValue) => {
  return factory = initValue => {
    let _count = initValue - incValue;

    return counter = () => {
      return _count += incValue;
    }
  }
}

const counterFactory = counterFactoryMaker(2);
const counter1 = counterFactory(0);
const counter2 = counterFactory(1);

console.log(counter1());
console.log(counter1());

console.log(counter2());
console.log(counter2());