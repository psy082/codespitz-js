import { prop } from './prop';


// Stage의 책임 
// 1. stage가 끝까지 왔는지 안왔는지 확인
// 2. 끝이 아니라면 stage를 올리고 speed를 바꾸는 기능
// 3. stage를 clear하는 기능
const Stage = class {
  constructor(last, min, max, listener) {
    /*
     last: 마지막 판의 값
     min, max: 최소 최대 속도 - 최대 이 이상은 빨라지지 않아
     listener: 다른 객체와 직접 관계를 맺지 않기 위한 함수, 자기의 변화를 listener에게 통보만 한다
     */
    prop(this, { last, min, max, listener });
  }
  clear() { // 본인의 상태 초기화
    this.curr = 0; // 현재 스테이지 값
    this.next(); // next호출
  }
  next() {
    if (this.curr++ < Stage.last) { // 마지막 판보다 작으면 아래의 로직이 작동한다
      // Stage가 하는 일 중 중요한일: 판이 올라가면 판의 스피드를 결정한다.
      // 판이 올라갈 때 speed가 올라가는 부분에 대한 처리를 게임이 해야 할까 stage가 해야 할까?
      // 현재 stage값을 Stage객체가 가지고 있으므로 Stage객체가 처리하도록 하자
      // speed 값은 stage값에 의해서 결정된다. => Stage 객체가 이 부분에 대한 계산을 다 처리하고 외부에서는 speed값을 받아서 쓰도록 
      // 은닉과 캡슐화를 적용하는 것이 더 좋겠다.
      const rate = (this.curr - 1) / (this.last - 1);
      this.speed = this.min + (this.max - this.min) * (1 - rate); //
      this.listener(); // 자기를 listen하는 객체한테 자기 stage하나 올라갔다고 통보해준다.
    }
  }
  score(line) {
    return parseInt((this.curr * 5) * (2 ** line));
  }
}