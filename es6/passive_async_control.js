$.post(url, data, e => {
  //언제 올까?
});

// 왜 언제가 중요한가? -> 경합 조건 때문
let result;
$.post(url1, data1, v => {
  result = v;
});
$.post(url2, data2, v => {
  result.nick = v.nick; // <= 순서가 있는 걸로 보인다. 만약에 코드가 길어지면 순서가 있는 로직이 독립적인 로직으로 보인다.
  report(result); // 그러나 이 코드는 위의 로직이 실행 된 것을 전제로 한다. 그러나 그런 로직이 잘 보이지 않는다
}); // 실제로 순서가 중요한데 순서를 모르는 문제가 발생한다. => 근본적인 콜백지옥의 문제 - 순서를 모른다
// 따라서 콜백안에 콜백을 넣을 수 밖에 없다 callback은 기본적으로 passive async
