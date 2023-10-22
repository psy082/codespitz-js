/*
  A = <TAG> BODY </TAG>
  B = <TAG />
  C = TEXT
  BODY = (A|B|C)N
*/

const parser = input => {
  input = input.trim();
  const result = { name: 'ROOT', type: 'node', children: [] };
  const stack = [{ tag: result }];
  let curr, i = 0, j = input.length;
  while (curr = stack.pop()) { // 고급 루프 문은 루프의 길이가 런타임 때 동적으로 바뀐다 - 동적계획: 루프를 결정하는 요인이 내부 루프를 돌다가 변경될 수 있다.
    while (i < j) {
      const cursor = i;
      if (input[cursor] === '<') {
        // A, B의 경우
      }
      else {
        //C의 경우
        const idx = input.indexOf('<', cursor);
        curr.tag.children.push({
          type: 'text', text: input.substring(cursor, idx)
        });
        i = idx; // 역할 상 다른 알고리즘과 독립적이다. - 꺽쇠 이전까지 text node로 묶어서 현재 노드의 children에 push하기 => 역할이 분리되었으면 코드관리를 위해서 즉시 함수화 시키자
      }
    }
  };
  return result;
};