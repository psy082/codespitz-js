// sync 함수이기 떄문에 값은 즉시 반환된다.
const sum = n => {
  const result = { isComplete: false };
  process.nextTick(_ => {
    console.log("calculate starts");
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    console.log("calculate complete");
    result.isComplete = true;
    result.value = sum;
    console.log(`return ${result.value}`);
  });
  return result;
};
// sum(100)을 호출하면 result에는 어떤 값이 저장되지만 즉시 받아서 사용할 수 없는 값이다
// background에서 계속 동작하고 있기 때문이다
const result = sum(100);
// 비로 튀어나온 result 객체는 return 값이 false이다
// 값을 확인하기 위해서는 결국 비동기로 확인해야 한다.
// DOM에 img element는 내부에 isComplete라는 속성을 가지고 있다.
const id = setInterval(() => {
  if (result.isComplete) {
    clearInterval(id);
    console.log(result.value);
  }
}, 10);
