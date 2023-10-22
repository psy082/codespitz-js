/*
  A = <TAG> BODY </TAG>
  B = <TAG />
  C = TEXT
  BODY = (A|B|C)N
*/

// 중요한 요령 - 코드를 짤 때는 쉬운 거부터 처리한다. => 의존성이 낮고 독립된 로직일 가능성이 높다
// 데이터 애널리시스를 잘 못하고 분석을 잘못하면 TDD를 해도 소용이 없다. 원래 코드가 나쁘기 떄문에
// 코드가 원래부터 설계가 나쁘거나 데이터 애널리시스를 잘못하면 뭘 해도 나쁜 코드이다.
// 좋은 코드를 짜는 비법은 데이터를 이해하고 재귀적인 로직이나 추상적인 공통점을 찾고 역할을 부여하는 것
// 바른 데이터 모델링을 했다면 코딩은 거의 매핑에 가깝다


// html parsing을 할 때, enter 하나만 쳐도 텍스트 노드가 생긴다.
// html 압축은 굉장히 효과적으로 dom의 렌더링 대상을 줄인다 -> 추천하는 바
// 렌더링을 빠르게 하고 싶으면 html 압축을 하는 게 가장 효과적이다 
const textNode = (input, cursor, curr) => { // input, cursor와는 다르게 curr는 객체를 받았고 심지어 객체의 값을 바꾸기까지 했다. 
  const idx = input.indexOf('<', cursor);
  curr.tag.children.push({
    type: 'text', text: input.substring(cursor, idx) //응집성과 결합성 중 선택해야 한다
  });
  return idx;
} // 알고리즘이 독립된 역할을 부여 받은 즉시 함수화 해야 한다 역할 인식을 빨리 하자

const elementNode = (input, cursor, idx, curr, stack) => {
  // 만약에 isClose에 기본 값 true를 준다면 의도가 제대로 표현이 될까? 분기에 의해 값이 결정된다는 것이 표현이 안된다. 
  // 분석한 데이터대로 정확하게 코드를 작성하는 능력이 필요하다. 예술적인 코드를 짤 필요는 없다. 왜 코드를 이렇게 짰는지를 알 수 있는가?
  let name, isClose; // => 공통 준비사항, 화이트 리스트 - 알고리즘은 복잡성을 다 제거하고 일반화된 화이트 리스트를 가지고 동작하는 게 최선이다.
  // 따라서 알고리즘 작성에 바로 돌입하기 보다는 화이트 리스트에 해당하는 부분을 시간을 들여서 찾는 것이 중요하다. 
  if (input[idx - 1] === '/') { // => 다른 점을 기술하는 부분을 메모리에 흡수하는 부분
    name = input.substring(cursor + 1, idx - 1), isClose = true;
  } else {
    name = input.substring(cursor + 1, idx), isClose = false;
  }
  // Case는 다 값으로 바꿀 수 있다. 아래의 공통적인 로직은 case의 차이를 인식하지 않고 값으로 저장된 일반화된 case(이제 더이상 case의 차이를 다루지 않는다)
  // 저장한 상태를 사용하는 일반화된 로직을 작성한다. => 메모리와 연산은 교환된다. 그 메모리를 이용하는 하나의 연산만 사용하면 된다.
  const tag = { name, type: 'node', children: [] }; // => 공통 처리 사항
  curr.tag.children.push(tag);
  if (!isClose) { // flag coupling 의존성이 높아졌지만 응집성을 위해 포기했다.
    stack.push({ tag, back: curr }); // 새로 자식 노드들이 생기는데, 자식 노드들을 다 만들고 나서 돌아갈 지점을 알아야 한다 => curr
    return true;
  }
  return false;
}

// 코드의 가독성은 변수명을 예쁘게 짓거나 코드 컨벤션을 지키면 높아질 것이라는 착각
// 읽기 쉬운(readable) 코드는 적절한 역할 모델에게 위임하는 코드이다. 그 다음 그 모델들 사이의 통신과 협업만 볼 수 있는 코드가 가독성이 높은 코드이다.
// 따라서 읽기 쉬운 코드를 작성하기 위해서는 역할을 찾아내고 분리해서 책임을 위임하는 방법 밖에 없다
// 연산, 함수형 프로그래밍, 수학적 과정이 들어가면 무조건 코드는 어려워 진다. 

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
        const idx = input.indexOf('>', cursor); // 공통된 것 부터 먼저 처리해야 다른 것을 처리할 때 중복이 없다.
        i = idx + 1; // 코드의 뉘앙스를 느낄 만큼 코드를 깊이 짜봐야 한다. 코드에 어떤 의도가 있는지 읽는 능력
        if (input[cursor + 1] === '/') { // 한국어로 정확하게 상황을 설명할 수 있다면 그 설명을 코드로 옮기면 된다.
          curr = curr.back;
        } else {
          if (elementNode(input, cursor, idx, curr, stack)) break;
        }
      }
      else {
        //C의 경우
        i = textNode(input, cursor, curr); // primitive - call by value이므로 외부에서 idx 값을 받아서 i값을 갱신한다
      }
    };
  }
  return result;
};