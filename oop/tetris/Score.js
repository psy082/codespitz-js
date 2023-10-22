import { prop } from './prop';

const Score = class {
  constructor(stage, listener) {
    prop(this, { stage, listener });
  }
  clear() { this.curr = this.total = 0 };
  add(line) {
    // tetris는 한번에 지운 줄 수에 따라서 점수 보상 체계가 다르다
    // line값은 몇줄 지웠는 지를 받는 것이다
    // 그런데 score의 보상은 stage에 따라서 결정된다. 따라서 stage 별 기본 score는
    // score한테 맡겨져 있는 것이 아니라 stage한테 맡겨져 있다. -> 값을 받아와야 한다.
    // score 값을 계산하는 부분을 stage에 위임해야 한다. 자기가 할일이 아니면 넘긴다.
    // 점수 계산 방법은 이제 Score 객체가 몰라도 된다. stage가 점수 계산 방법을 바꿔도 score는 상관이 없다.
    const score = this.stage.score(line);
    this.curr += score;
    this.total += score;
    // listener가 있어야 하는 이유
    // score 그림을 그리는 건 panel에서 하는 일이다
    // panel쪽에 score의 변경을 알려주어야 하기 때문에 listener가 필요하다

    this.listener();
  }
}