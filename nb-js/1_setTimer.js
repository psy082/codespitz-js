const { performance } = require('perf_hooks');

const Item = class {
  time;
  block;
  constructor(block, time) {
    this.block = block;
    this.time = time + performance.now();
  }
}
// 배열에 담을 수 있는 것은 값만 가능
// 똑같은 객체를 리스트에 두개 이상 들어간다는 건 의도한 것인가?
// 배열에 똑같은 게 들어가도 되는건 값이 들어갈 때
// 값과 참조의 차이 
// 값 그 자체로 판단되는 데이터 - 여러번 중복되도 된다. 
// 객체를 집어 넣는 것은 Set에 집어넣어서 중복을 방지해야 한다.
const queue = new Set;

const f = time => {
  // es6이후의 모든 iterable 타입의 forEach는 복사본을 돌리도록 되어 있다.
  queue.forEach(item => {
    // console.log(item.time, time);
    if (item.time > time) return;
    queue.delete(item);
    item.block();
  });
  process.nextTick(f, performance.now());
};
process.nextTick(f, performance.now());

const timeout = (block, time) => queue.add(new Item(block, time));
timeout(_ => console.log("hello"), 1000);