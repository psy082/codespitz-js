const looper = (n, f, slice = 3) => {
  let limit = 0,
    i = 0;
  const runner = _ => {
    while (i < n) {
      // f가 blocking 함수일 가능성이 있다.
      // f의 실행시간을 어떻게 알 수 있는가?
      // slice 값을 수동으로 줘야 한다.
      if (limit++ < slice) f(i++);
      else {
        limit = 0;
        requestAnimationFrame(runner); // 실행하는 logic과 알고리즘이 섞여 있다.
        break;
      }
    }
  };
  requestAnimationFrame(runner);
};

const loop_gen = function*(n, f, slice = 3) {
  let i = 0,
    limit = 0;
  while (i < n) {
    if (limit++ < slice) f(i++);
    else {
      limit = 0;
      yield;
    }
  }
};

const executer = iter => {
  const runner = _ => {
    iter.next();
    requestAnimationFrame(runner);
  };
  requestAnimationFrame(runner);
};
