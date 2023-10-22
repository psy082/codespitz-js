const looper = (n, f, ms = 5000, i = 0) => {
  let old = performance.now(),
    curr;
  const runner = curr => {
    while (i < n) {
      if (curr - old < ms) f(i++);
      else {
        //성능이 좋아지지 않는다 그래도 브라우저 시작 시에 메모리에 시작 시간 값을 가지기 때문에 Date now보다는 빠르다
        // js in memory 객체가 아니다 컴퓨터 기판에서 가져오는 값이다
        // 우리 memory에서 불러오는 값이 아니면 다 io라고 부른다
        // io는 in memory에 비해 많이 느리다
        old = performance.now();
        requestAnimationFrame(runner);
        break;
      }
    }
  };
  // requestAnimationFrame 함수가
  // performance.now() 인자를 runner에 넣어준다
  requestAnimationFrame(runner);
};

console.log(process.env);
