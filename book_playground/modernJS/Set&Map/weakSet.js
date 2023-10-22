let set = new Set(),
  key = {};

set.add(key);
console.log(set.size); // 1

// 원본 참조는 제거
key = null;

console.log(set.size); // 1

//원본 참조를 다시 가져옴
console.log(key = [...set][0]); // {}


// -------------------------------------

set = new WeakSet(),
  key = {};

set.add(key);

console.log(set.has(key));

// key의 마지막 강한 참조를 제거(또한 Weak Set으로부터 제거됨)
key = null;

// WeakSet 내 key에 대한 참조에 더 이상 접근할 수 없다.
// has() 메서드에 전달하기 위해서도 객체 참조 하나가 필요하기 때문에, 제거된 값을 확인하는 것은 불가능하다