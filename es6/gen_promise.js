const profile = function*(end, r) {
  const userid = yield new Promise(res => $.post("member.php", { r }, res));
  let added = yield new Promise(res => $.post("detail.php", { userid }, res));
  added = added.split(",");
  end({ userid, nick: added[0], thum: added[1] });
};

// 발동하는 logic
const executor = (end, gene, ...arg) => {
  const iter = gene(end, ...arg);
  const next = ({ value, done }) => {
    if (!done) value.then(v => next(iter.next(v)));
  };
  next(iter.next());
};
// promise를 기다림
