const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor);
  curr.tag.children.push({
    type: 'text', text: input.substring(cursor, idx)
  });
  return idx;
}

// html은 멀티 스택 상황이 발생하지 않는다 => 컨텍스트가 하나만 진행된다.

const elementNode = (input, cursor, idx, curr, stack) => { // if 문을 사용하는 것보다 개선하기
  const isClose = input[idx - 1] === '/'; // parser에 필요한 유일한 연산이다. 
  // 중복은 제거하는 것이라기 보다는 발견하는 것이다. 데이터 수준의 중복, 코드 수준의 중복, 아키텍쳐 수준의 중복
  // 실력에 따라 중복을 발견하는 수준이 다르다.
  // 내가 짠 코드는 한번 짜고 끝낼 것이 아니라, 계속 볼 때마다 중복을 발견하고 제거하는 것을 반복하는 연습
  // 코드 수준의 중복 찾기 - 언어와 문법에 대한 이해 의미를 훼손하지 않으면서 줄인다, 
  // 아키텍쳐 수준의 중복 찾기 - 역할 관계 인식, 확장가능성, 책임 인식, 능력은 별개로 훈련해야 한다
  // 데이터 중복 - 정규화, 및 데이터 중복을 제거하는 전통적인 방법들
  // 제대로 돌아가지 않기 떄문에 조언해야 할 것과 더 좋은 알고리즘을 제안하는 것 이상의 스타일에 대한 참견은 하지 말자
  // 코드는 잘 동작하고 바른 로직으로 되어 있으면 바른 코드이다.
  const tag = { name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)), type: 'node', children: [] };
  curr.tag.children.push(tag);
  if (!isClose) {
    stack.push({ tag, back: curr });
    return true;
  }
  return false;
}

// 과제 1: stack point를 인식해서 재귀함수 리턴 포인트로 바꾸기 -> 재귀 함수로 바꾸기
// 과제 2: stack을 제거하고 작성해보기
// 과제 3: html은 json의 구조와 유사하다 더이상 쪼개지지 않는 최소 데이터들: 문자열, 숫자, boolean, null
//        큰 구조 2종: object, array, - 난점: 큰따옴표 안의 대괄호나 중괄호는 구조가 아닌 문자열. json 파서 만들어보기
const parser = input => {
  input = input.trim();
  const result = { name: 'ROOT', type: 'node', children: [] };
  const stack = [{ tag: result }];
  let curr, i = 0, j = input.length;
  while (curr = stack.pop()) {
    while (i < j) {
      const cursor = i;
      if (input[cursor] === '<') {
        const idx = input.indexOf('>', cursor);
        i = idx + 1;
        if (input[cursor + 1] === '/') {
          curr = curr.back;
        } else {
          if (elementNode(input, cursor, idx, curr, stack)) {
            break;
          }
        }
      }
      else {
        i = textNode(input, cursor, curr);
      }
    };
  }
  return result;
};

console.log('--------', parser(`<div>
a
<a>b</a>
c
<img/>
d
</div>

`));