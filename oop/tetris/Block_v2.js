import { prop } from './prop';

const Block = class {
  // 자식이 몇개 보냈는 가에 따라서 blocks를 받고 있다.
  constructor(color, ...blocks) {
    prop(this, {
      color, rotate: 0, blocks,
      // 자식의 block의 개수에 따라서 count 값을 정한다.(run time 때)
      // 
      count: blocks.length - 1
    });
  }
  // 자식의 count 값에 따라서 rotate 값이 결정되기 때문에, 자식의 경우의 수 이상으로 rotate가 돌지 않는다.
  left() { if (--this.rotate < 0) this.rotate = count }
  right() { if (++this.rotate > count) this.rotate = 0 }
  getBlock() { return this.blocks[this.rotate] }
  // 이 수준에 와서야 자식들의 공통점을 묶은 상태로 충분히 추상화가 되었다.
  // 어설픈 수준의 categorize를 하면 아까 그 수준으로 추상화가 된다.
}

const blocks = [
  class extends Block {
    constructor() {
      // 변경된 코드에서는 color이외에도 context 변수에 현재 저장할 block을 저장하고 있다.
      // 진짜 다른 점은 이정도 밖에 없는 수준으로 차이점이 낮아진다.
      // 추상화의 적절성에 대한 판단은 domain을 대입해 보면 알 수 있다.
      // block끼리 다른 점은 무엇인가? => 색깔과 모양 => 이래야지 완성이 된 것이다.
      // 이전에 있었던 getblock을 생각해보면 getblock이 정말로 블럭들마다 달라야 하는 요소인가?
      // => 아니다.(물론 아니다 라는 결론을 가지기 까지가 어렵다. 간편하게 생각하면 맞다는 생각이 들기 떄문에)
      // 결론: 코드가 아니라 도메인이 이겨야 한다. 도메인을 코드에 맞추는 것이 아니라 도메인에 코드를 맞춰야 한다.
      super('#264653',
        [[1], [1], [1], [1]],
        [1, 1, 1, 1]
      );
    }
  },
  class extends Block {
    constructor() {
      super('2a9d8f',
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0], [1, 1], [1, 0]],
        [[1, 1, 1], [0, 1, 0]],
        [[0, 1], [1, 1], [0, 1]]
      )
    }
  },
  class extends Block {
    constructor() {
      super('e9c46a',
        [[1, 0, 0], [1, 1, 1]],
        [[1, 1], [1, 0], [1, 0]],
        [[1, 1, 1], [0, 0, 1]],
        [[0, 1], [0, 1], [1, 1]]
      )
    }
  },
  class extends Block {
    constructor() {
      super('f4a261',
        [[0, 0, 1], [1, 1, 1]],
        [[1, 0], [1, 0], [1, 1]],
        [[1, 1, 1], [1, 0, 0]],
        [[1, 1], [0, 1], [0, 1]]
      )
    }
  },
  class extends Block {
    constructor() {
      super('e76f51',
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]]
      )
    }
  },
  class extends Block {
    constructor() {
      super('e63946',
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]]
      )
    }
  },
  class extends Block {
    constructor() {
      super('f1faee',
        [[1, 1], [1, 1]]
      )
    }
  }
]