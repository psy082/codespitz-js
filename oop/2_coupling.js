// 1. Content Coupling - 강결합
// 결합 중에 가장 나쁜 결합
// class 의 변수 이름 v가 data로 바뀌는 경우
// class B에서는 오류가 발생한다. => class B 까지 수정해야 되는 상황이다 위험한 코드
// 강결합은 인수로 받는 객체의 내부 데이터까지 다 아는 상황이다
const A = class {
  constructor(v) {
    this.v = v;
  }
};
const B = class {
  constructor(a) {
    this.v = a.v;
  }
};
const b = new B(new A(3));

// 2. Common Coupling - 강결합
// class A, B 모두 common 객체를 참조해서 만든다
// 이럴 경우 common객체를 통제함으로 다른 객체에 미치는 영향을 통제할 수는 있다.
// 하지만 common 객체와 다른 객체가 1:1로 결합되어 있다.
const Common = class {
  // in memory 에 있는 공용 객체, 글로벌 객체
  constructor(v) {
    this.v = v;
  }
};

const A = class {
  constructor(c) {
    this.v = c.v;
  }
};

const B = class {
  constructor(c) {
    this.v = c.v;
  }
};

const a = new A(new Common());
const b = new B(new Common());

// 3. External Coupling - 강결합
// A, B class가 외부의 정의에 의존해서 구성되어 있다.
// 따라서 외부 데이터 구조가 변경되면 코드가 변경되야 한다.
// 하지만 external coupling이 불가피한 경우가 많다.
// 대부분 나쁘지만 회피할 방법이 없다 => 정복하는 수 밖에 없다.
// 앞의 두가지 결합은 아예 코드를 새로 짜야 하지만 이 결합은 정복해야 하는 결합이다. 나쁘지만 관리해야 하는 대상
// common은 우리가 만든 객체이지만 external은 외부에서 주어진 객체이다.
// 공식 api 문서와 같은 것이 존재하는 이유(swagger가 존재하는 이유) <= external coupling이 불가피 하기 때문이다.
const A = class {
  constructor(member) {
    this.v = member.name; // 좋은 코드는 이 부분에서 member.name이 없으면 throw 던져서 죽어버린다. 더 전진하지 않는다.
  } // 서버의 잘못을 잡아서 error를 던지지 않으면 이 부분의 오염이 뒤의 코드까지 전파된다.
  // 반드시 예외처리로 잡아 낼 것 - 되도록 문제가 발생한 즉시 에러 코드를 발생시켜야 한다.
};

const B = class {
  constructor(member) {
    this.v = member.age;
  }
};

fetch("member")
  .then((res) => res.json())
  .then((member) => {
    const a = new A(member);
    const b = new B(member);
  });

// 4. Control Coupling - 강결합
// A class 내부의 변화가 B class의 오작동을 유발한다.
// control coupling의 경우 현대에는 디자인 패턴을 포함한 객체 설계를 통해서 피할 수 있는 결합이다
// 따라서 고쳐야 하는 결합이다.
// 이 결합이 생기는 이유는 routine에게 직접 대상 객체를 주는 게 아니라 대상 객체의 힌트만 줄 때 발생한다.
// 예를 들어, 어떤 일을 할 때 종업원에게 주문할 때, 주문에 대한 시간을 줄이기 위해서 메뉴 3번 주세요라고 주문하는 것
// 중간에 인터페이스가 끼여 있을 때, 객체 전체를 받는 게 아니라 플래그를 받아서 플래그에 대한 처리를 한다.
// flag형 변수는 order를 넘기기 위한 기호들을 넘기는 것이다.
// 문제는 class A에서의 flag 작동에 변화가 생겼을 때, A class를 사용하는 다른 객체에 영향을 줄 수 있기 때문에
// 오히려 거꾸로 class A의 변경이 필요한 시점에서 변경을 못하게 된다. <= control flag 때문에
// flag 변수가 control flow에 영향을 끼치기 때문에 control coupling이라고 부른다.
// 이 문제를 일으키기 쉬운 패턴이 팩토리 패턴이다. 팩토리 패턴을 잘못 짜면 이런 결합이 자주 발생한다.
// 일반적인 해법은 전략 패턴을 사용하는 것이다. 전략객체를 받아서 전략 객체에 control을 위임하는 방식으로 문제를 해결할 수 있다.

const A = class {
  process(flag, v) {
    switch (flag) {
      case 1:
        return this.run1(v);
      case 2:
        return this.run2(v);
      case 3:
        return this.run3(v);
    }
  }
};

const B = class {
  constructor(a) {
    this.a = a;
  }
  noop() {
    this.a.process(1);
  }
  echo(data) {
    this.a.process(2, data);
  }
};

const b = new B(new A());
b.noop();
b.echo();

// 5. Stamp Coupling - 강결합 OR 유사 약결합
// A와 B가 ref를 통해 통신한다. ref에 의해 모든 문제가 발생한다.
// 범위와 부분집합과 전체집합의 문제
// 사실 class A는 data 전체를 받을 필요 없이 count 값만 받아서 inc하면 된다.
// A는 data 안에 count라는 변수가 있다는 정보는 A의 관심사가 아니다.
// 그래서 this.data를 받을 게 아니라 this.data안에 있는 count값만 받아가면 된다.
// A가 필요한 것은 좁은 범위 인데, 넓은 범위를 받아 갔다. 그 결과 class B에서 count를 cnt로 바꾸면
// class A의 로직은 깨진다. 이 때문에 거꾸로 class A때문에 B를 변경할 수 없는 문제가 발생한다.
// 결국 항상 데이터를 줄 때, 필요한 범위까지만 데이터를 줘야 한다.
// 그렇게 변경한다면 결국 값의 갱신은 B의 책임이 된다.
// data가 역할에 맞는 범위를 넘어가면 stamp의존성이 발생한다.
const A = class {
  add(data) {
    data.count++;
  }
};

const B = class {
  constructor(counter) {
    this.counter = counter;
    this.data = { a: 1, count: 0 };
  }
  count() {
    this.counter.add(this.data);
  }
};

const b = new B(new A());
b.count();
b.count();

// 6. Data Coupling - 약결합
// A와 B는 value로 통신한다. => 결합 문제와 의존성 문제에서 자유로워 진다.
// 의존성이 없어진 것은 아니다. 데이터를 가지고 연산을 해야 하기 때문에 데이터 특성에 대한 의존성은 남아있다.
// 그러나 결합중에서 가장 안전한 형태이다
// 결과적으로 다다라야 하는 지점은 data coupling이다.
// 데이터를 가지고 통신을 할 때, call by value를 사용하도록 코드를 작성하는 것만으로도
// data coupling을 달성하고 결합도를 낮출 수 있다.
const A = class {
  add(count) {
    return count + 1;
  }
};

const B = class {
  constructor(counter) {
    this.counter = counter;
    this.data = { a: 1, count: 0 };
  }
  count() {
    this.data.count = this.counter.add(this.data.count);
  }
};
const b = new B(new A());
b.count();
b.count();
