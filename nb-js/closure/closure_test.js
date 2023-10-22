
const mainFunc = () => {
  let i = 100;
  const externalFunc = () => {
    console.log("It's external the i is " + i);
    return i + 1;
  };
  i = externalFunc();
  console.log("It's main the i is " + i);
}

mainFunc();