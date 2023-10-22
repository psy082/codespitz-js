let arr1 = [2];

function solution(arr) {
  if (arr.length == 1) return 1;

  let count = 1;
  let curr;

  while (true && count < 100) {
    let val = arr[0];
    let tmp = [0];
    console.log(`val : ${val}, tmp : ${tmp}`)
    while (curr = arr.shift()) {
      console.log(`curr : ${curr}`)
      console.log(`arr : ${arr}`)
      if (val == curr) tmp.push(tmp.pop() + 1);
      else {
        val = curr;
        tmp.push(1);
      }
      console.log(`tmp : ${tmp}`)
    }

    arr = tmp;
    console.log(`${count} round ends arr : ${arr}`)
    count++;

    if (arr.length <= 1) break;
  }
  return count;
}

console.log(solution(arr1));