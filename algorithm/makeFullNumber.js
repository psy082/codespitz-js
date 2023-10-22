// 1부터 n까지의 숫자 중 m개를 뽑는 전체 가지수
// 결과는 배열에 저장된다.
// 항상 n > 1, n >= m을 만족한다
const makeFullRecur = (n, m, arr, curr) => {
  if (curr.length === m) {
    arr.push([...curr]);
    return;
  }
  if (curr.length === 0) curr.push(1);

  let begin = curr[curr.length - 1] + 1;
  for (let i = begin; i <= n; i++) {
    curr.push(i);
    makeFullRecur(n, m, arr, curr);
    curr.pop();
  }
  return;
}

let n = 6, m = 4, arr = [], curr = [];
makeFullRecur(n, m, arr, curr);
console.log(arr);
