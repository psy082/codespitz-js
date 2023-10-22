// 1. Coincidental Cohesion
// 응집도 중에 가장 나쁜 경우는 응집되지 않은 경우가 아니라 
// 코드들이 우연히 목적없이 모여있는 경우이다.
// 이런 코드가 위험한 이유는 작성한 사람 외에는 해당 객체에 뭐가 있는지 모른다는 것
// 결과적으로 똑같은 역할을 하는 함수들이 여러개 생긴다.
const Util = class {
  static isConnect() { };
  static log() { };
  static isLogin();
};

// 2. Logical Cohesion
// 사람이 인지할 수 있는 논리적 집합, 교육이나 상식의 수준이 비슷한 사람들끼리만 인식 할 수 있는 경우.
// Math객체가 수학적인 의미를 갖는다라는 것을 알고 있어야 사용할 수 있다.
// logical은 도메인이 너무 특수하지 않으면 써도 된다.(Math와 같은 경우)
// 도메인이 일반적일수록 사용이 더 가능해진다
const Math = class {
  static sin(r) { }
  static cos(r) { }
  static random() { }
  static sqrt(v) { }
};

// 3. Temporal Cohesion
// 시점을 기준으로 관계없는 로직을 묶는다. 
// 관계가 아니라 코드의 순서가 실행을 결정하는 경우인데 역할에 맞는 함수에게 실행을 위임해야 한다
// init 함수만 보고 init함수를 구성하는 여러가지 init들이 순서가 필요한지 
// 아니면 병렬적으로 실행되도 되는 것인지 판단이 어렵다
// 사람은 일반적으로 시간의 흐름대로 사고하는 것이 자연스럽기 때문에 temporal로 구성하지만 이런 구성은 위험하다
// 프로그램은 자연현상이 아니라 논리적인 흐름이기 떼문에 논리에서는 순서가 바뀔수 있다.(병행적으로 필요한 조건들의 경우에는)
// 사용하지 않을 수 없기 때문에 관리해야 할 대상이다.
const App = class {
  init() {
    this.db.init();
    this.net.init();
    this.asset.init();
    this.ui.start();
  }
}

// 4. Procedural Cohesion
// 순서도와 의사코드를 통해 이정도의 응집도에는 도달이 가능하다
const Account = class {
  login() {
    p = this.pToken();
    s = this.sToken(p);
    if (!s) this.newLogin();
    else this.auth(s);
  }
}


// 5. Communicational Cohesion
// 1개의 대상에 대해서 상호보완적으로 그 대상을 처리한다
// 역할은 책임이기도 하고 권한이기도 하다. 권한과 책임의 묶음으로 역할을 설명할 수 있다.
// 일반적으로 프로그램에서 장려하고 있는 것은 1개의 객체가 1개의 역할만 수행하도록 한다(단일 책임 원칙)
// 1개의 역할에 대해서 필요한 기능들(책임과 권한)을 모아 놓은 것
// 예를 들어 배열을 처리하는 코드 부분은 전부 배열 객체 안에 있을 것이라고 예상하는 것
const Array = class {
  push(v) { };
  pop() { };
  shift() { };
  unshift() { };
}


// 6. Sequential Cohesion
// 실행 순서가 밀접하게 관계가 있고 자료를 공유하거나 출력 결과가 연계된다.
// procedural과 communicational을 합쳐놓은 개념
// ptoken과 stoken의 순서가 의미가 있는데, 각각의 순서가 진행되었는 지 여부를 객체 내에서 파악할 수가 있다.
// => 응집도가 높다
// 발더 패턴 연계되어 있는 컴플루언스 메소드들의 합체로 마지막에 빌더를 통해 결과를 만들어낸다.
// 앞의 실행 결과가 뒤의 실행결과와 밀접한 연관을 가지고 결과를 만들어 낸다.
// 보통 sequential cohesion에 도달하기 위해서 chainging되어 있는 코드의 연쇄로 보기도 한다.
const Account = class {
  ptoken() {
    return (this.pk || IO.cookie.get("ptoken"));
  }
  stoken() {
    if (this.sk) return this.sk;
    if (this.pk) {
      const sk = Net.getSessionFromPtoken(this.pk);
      sk.then(v => this.sk)
    }
  }
  auth() {
    if (this.isLogin) return;
    Net.auth(this.sk).then(v => this.isLogin)
  }
}

// 7. Functional Cohesion
// 역할 모델에 충실하게 단일한 기능이 의존성 없이 생성된 경우 
// 우리가 추구해야 하고 영원히 달성할 수 없는 응집성
