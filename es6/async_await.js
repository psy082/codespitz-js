//executor가 내장되어 있는 generator
// 병렬로 걸 수 없기 때문에 await에 다수의 promise를 한꺼번에 걸어야 한다
const profile = async function(end, r) {
  const userid = await new Promise(res => $.post("member.php", { r }, res));
  let added = await new Promise(res => $.post("detail.php", { userid }, res));
  added = added.split(",");
  end({ userid, nick: added[0], thum: added[1] });
};
