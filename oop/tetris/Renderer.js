import { prop } from './prop';

const Renderer = class {
  constructor(col, row) {
    prop(this, { col, row, block: [] });
    // row 초기화가 처음부터 필요할까? 생각해보기
    while (row--) this.block.push([]);
  }
  // 그림을 뭘로 그렸는가에 따라서 초기화 하는 방식도 달라야 하기 떄문에
  // 자식 객체가 override 하도록 하자, svg를 clear하는 방식과 canvas를 clear하는 방식이 다르다
  // 부모가 clear할 수 없다. 자식들이 알아서 clear 해야 한다.
  // 어차피 자식이 clear함수를 작성해야 한다면 부모에게 clear함수를 왜 만들어 놓았는가? => 대체 가능성
  // 자식을 다 부모로 보고 싶다. 어떤 자식이 와도 clear를 호출할 수 있는데, 자식의 clear코드가 실행된다.
  // 어떤 renderer가 와도 clear와 rendering은 해야 한다.
  clear() { throw 'override!'; }
  render(data) {
    // 부모 render에서 공통적으로 해줄 수 있는 수준
    // data객체가 넘어왔을 때, 진짜 Data객체인지 대신 확인해줄게.
    // protocol 확인 후에 아니면 error throw
    if (!(data instanceof Data)) throw 'invalid data!';
    // 진짜 rendering은 자식한테 위임한다.
    // 자식은 render 메소드를 override하지 않을 것이다. 부모한테만 있는 메소드이다.
    // 그러나 부모 안에서도 _render를 호출할 때의 this는 내적 동질성으로 인해서 자식 객체 this가 1된다.
    // 실제 외부에 공개된 함수는 부모 객체의 메소드인 render함수이다. => 내적 동질성 코드이다.₩11₩
    // 이런 내적 동질성을 이용한 패턴을 템플릿 메소드 패턴이라고 부른다. => 내적 동질성을 보장해주는 언어에서만 사용할 수 있다.
    this._render(data);
  }
  _render(data) { throw 'override!'; }
}