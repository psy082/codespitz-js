import { prop } from './prop';

const Block = class {
  constructor(color) {
    prop(this, { color, rotate: 0 });
  }
  // 추상화 categorize
  // 모든 block의 모양이 다르더라도 회전해야 한다는 점은 공통적이다
  // 공통적으로 가져할 할 부분을 추출하는 것
  left() { if (--this.rotate < 0) this.rotate = 3; }
  right() { if (++this.rotate > 3) this.rotate = 0; }
  // 부모는 자식 쪽에서 방향을 4가지로 가질 것으로 생각했는데, 실제 어떤 자식은 2개 밖에 없다

  getBlock() { throw 'override!'; } // 직접 부르면 error throw가 발생한다. 자식들이 구현하기를 원하는 것

}

const block = [
  class extends Block {
    constructor() {
      super('#f8cbad');
    }
    getBlock() {
      return this.rotate % 2 ?
        [[1], [1], [1], [1]] :
        [1, 1, 1, 1]
    } // 부모 사정에 자식이 맞추고 있는 것
  },
  class extends Block {
    constructor() {
      super('#ff3699');
    }
    getBlock() {
      // -> 부모쪽의 rotation 값을 자식이 알고 있는 게 맞는 걸까?
      // 부모쪽에서 rotation을 관리하는 데 자식 쪽에서 rotation값을 알고 있는 것은 은닉을 깨먹는 것
      // 부모 자식 간에도 은닉과 캡슐화가 유지된다. 
      // 기본적으로 color와 rotate값은 자식의 고유 속성이 아니다
      // 
      switch (this.rotate) {
        // 배열을 매번 새로 생성하는 문제도 발생 -> 이 데이터는 정적인 데이터로 한번 만든 거 계속 사용하면 되는데,
        // 불필요하게 계속 새로 만들고 있다. -> context data가 되어야 한다.
        case 0: return [[0, 1, 0], [1, 1, 1]];
        case 1: return [[1, 0], [1, 1], [1, 0]];
        case 2: return [[1, 1, 1], [0, 1, 0]];
        case 3: return [[0, 1], [1, 1], [0, 1]];
      }
    } // 여기서 드는 의문 -> 우리가 충분히 추상화를 했을까??
    // rotate를 다루는 코드는 총체적 난국이 되었다. 은닉과 캡슐화가 깨졌을 뿐더러
    // 자식과 부모가 서로의 사정을 잘 모르고 있다. case가 실제로 다른데 다른 쪽에 맞춰지고 있다. 
    // 부모의 잘못된 가정에 따른 잘못된 추상화
  }];