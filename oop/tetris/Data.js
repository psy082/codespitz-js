import { prop } from './prop';

// 배열을 상속하고 col, row를 가지고 있는 객체이다.
// 속성이 중요하기는 하지만 그냥 배열을 쓰는 걸로만으로는 container의 형을 확인할 수 없기 때문에
// 객체로 만들었다. 이런 class를 marker class라고 부른다. 사용자 정의 형으로 바꾸기 위해서 만드는 class
// es5와 es6의 가장 큰 차이점은 es5까지는 prototype을 통해 어떤 상속을 사용해서 class를 만든다고 하더라도
// 만들어진 객체는 무조건 object이다. prototype chain이 걸려있을 뿐이지, 결국은 object이다.
// 그런데 es6이후부터 new keyword를 사용해서 class를 만들면, 언제나 타고 타고 가서 부모 객체의 class가 만들어 진다.
// => home object, home object의 대상은 core객체이다. 
const Data = class extends Array {
  constructor(col, row) {
    prop(this, { col, row });
  }
}