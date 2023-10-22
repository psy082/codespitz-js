const working = _ => {};
for (let i = 0; i < 100000; i++) working();


// requestAnimationFrame을 제외한 위의 로직에서는 
// 순수한 동기 로직(추상화 되어있는 로직) -> 일반화 되어 있는데에 비해서
// requestAnimationFrame이나 timeout은 시스템 타이머에 의존하는 부분이다.
// 위의 일반화된 로직과는 어울리지 않는 부분이다.
const nbFor = (max, load, block) => {
  let i = 0;
  const f = time => {
    let curr = load;
    while (curr-- && i < max) {
      block();
      i++;
    }
    console.log(i);
    if (i < max - 1) requestAnimationFrame(f); //callback 함수가 다음 callback을 호출한다.
  }
  requestAnimationFrame(f);
}

// 차이점 위에서는 closure를 사용하고 있지만 아래에는 지역변수를 사용하고 있다.
// frame 건너뛰기도 위에서는 시스템 함수에 의존하고 있지만 아래에는 외부에서 호출하는 next()에 달려있다
// 시스템 함수를 사용하지도 인자로 받지도 않고 제어의 일부를 외부에 위임함으로 문제를 해결한다.
// 다 sync 로직으로 구성되어 있기 때문에 이해하기가 더 쉽다.
// 어떤 방식으로 호출되는지 추적하지 않아도 되기 때문이다.

const gene = function* (max, load, block) {
  let i = 0,
    curr = load;
  while (i < max) {
    if (curr--) {
      block();
      i++;
    } else {
      curr = load;
      console.log(i);
      yield; // loop의 중지점에 해당한다.
    }
  }
}

// 관심사와 추상 로직의 분리
const nbFor2 = (max, load, block) => {
  const iterator = gene(max, load, block);
  const f = _ => iterator.next().done || setTimeout(f, 0);
  setTimeout(f, 0);
}

const gene2 = function* (max, load, block) {
  let i = 0;
  while (i < max) {
    yield new Promise(res => {
      let curr = load;
      while (curr-- && i < max) {
        block();
        i++;
      }
      console.log(i);
      setTimeout(res, 0);
    });
  }
};

const nbFor3 = (max, load, block) => {
  const iterator = gene2(max, load, block);
  const next = ({
    value,
    done
  }) => done || value.then(v => next(iterator.next()));
  next(iterator.next());
}

const gene3 = function* (max, block) {
  let i = 0;
  while (i++ < max) yield new Promise(res => {
    block();
    res();
  });
}