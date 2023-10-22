const profile = function* (end, next, r) {
  const userid = yield $.post("member.php", { r }, next);
  let added = yield $.post("detail.php", { userid }, next);
  added = added.split(",");
  end({ userid, nick: added[0], thum: added[1] });
};

const executer = (end, gene, ...arg) => {
  // next 함수는 iterator의 next함수를 불러준다
  // next 함수 입장에서는 iterator를 인식할 수 있어야 하는데,
  // iterator는 함수 안에 있기 때문에 나중에 인식해도 된다.
  // js의 경우 호출할 때까지 지연평가하고 지연실행한다.
  // syntax error가 없는 이상 모든 변수의 정당함은 parsing 시점이 아니라 실행 시점에 평가한다.
  const next = v => iter.next(v); // 문이 아니고 식이라서 아직 실행 전이다.
  const iter = gene(end, next, ...arg);
  iter.next();
};
