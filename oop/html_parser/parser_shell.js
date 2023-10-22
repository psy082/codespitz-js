//result 객체와 같은 태그들을 리턴 하고 싶다
const parser = input => {
  input = input.trim();
  const result = { name: 'ROOT', type: 'node', children: [] };
  const stack = [{ tag: result }];
  let curr, i = 0, j = input.length;
  while (curr = stack.pop()) { // 고급 루프 문은 루프의 길이가 런타임 때 동적으로 바뀐다 - 동적계획: 루프를 결정하는 요인이 내부 루프를 돌다가 변경될 수 있다.
    while (i < j) {

    }
  };
  return result;
};