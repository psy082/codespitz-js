let result;
const promise = new Promise(r => $.post(url1, data1, r));
promise.then(v => {
  result = v;
});

//실제적인 비동기 행위와 콜백의 처리를 완전히 분리할 수 있다.
// 2개의 promise가 이미 같이 실행되고 있다.
const promise1 = new Promise(r => $.post(url1, data1, r));
const promise2 = new Promise(r => $.post(url2, data2, r));
promise1.then(result => {
  promise2.then(v => {
    result.nick = v.nick;
    report(result);
  }); // 제어가 우리 손에 돌아왔다.
});
