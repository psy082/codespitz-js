/* 
 * `codeOwnersMap`과 `directory`를 입력받아
 * `directory`의 코드 주인 목록을 반환하는 함수를 작성하세요.
 */

const codeOwnersMap = {
  "scripts": ["배수진"],
  "services": {
    "business-ledger": ["고찬균", "배수진"],
    "toss-card": ["채주민", "유재섭"],
    "payments": ["유재섭"],
  }
}

// function solution(codeOwnersMap, directory) {
//   const hierarchy = directory.split('/');

//   let currLevel = codeOwnersMap;
//   for (const level of hierarchy) {
//       currLevel = currLevel[level];
//   }
//   return currLevel;
// }

function solution(type, id, listener) {
  return {
      type,
      id,
      onEvent(event) {
          listener(event);
          if (this.parentNode) {
            this.parentNode.onEvent(event);
          }
      },
      addChild(node) {
          let parentNode = this.parentNode; 
          let isParent = false;
          while(parentNode) {
              if (parentNode.id === node.id) {
                  isParent = true;
                  break;
              }
              parentNode = parentNode.parentNode;
          }
          if (!isParent) {
            node.parentNode = this;
            this.children.push(node);
          } else throw new Error('Parent node can not be appended');
      },
      removeChild(node) {
          const index = this.children.findIndex(({id}) => id === node.id);
          if (index > -1) this.children.splice(index, 1);
          else throw new Error(`there is no node: ${node.id}`);          
      },
      parentNode: undefined,
      children: [],
  }
}

const element1 = solution(
  'div',
  'element-1',
  e => console.log(`element1: ${e}`)
);

// element1: click event 출력
element1.onEvent('click event');
console.log(element1.id, element1.type);

const element2 = solution(
  'div',
  'element-2',
  e => console.log(`element2: ${e}`)
);

element1.addChild(element2);

// 아래 내용을 차례대로 출력
// element2: mouseover event
// element1: mouseover event
// element2.onEvent('mouseover event');

const element3 = solution(
  'div',
  'element-3',
  e => console.log(`element3: ${e}`)
);

element2.addChild(element3);

element3.onEvent('mouseover event');

element1.removeChild(element2);
console.log(element1.children);