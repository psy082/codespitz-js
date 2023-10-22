let arr1 = [123, 234, 213, 432, 234, 1234, 2341, 12345, 324];

const is_anagram = (word1, word2) => {
  word1 = word1.toString();
  word2 = word2.toString();
  if (word1.length !== word2.length) return false;
  let sum = 0;
  for (let i = 0; i < word1.length; i++) {
    sum += (parseInt(word1[i]) - parseInt(word2[i]));
  }
  return (sum == 0 ? true : false);
}


const solution = (arr) => {
  let result = [];
  let val;
  while (val = arr.shift()) {
    result.push(1);
    for (let i = arr.length - 1; i >= 0; i--) {
      let curr = arr.pop();
      if (!(is_anagram(val, curr))) {
        arr.unshift(curr);
      }
      else {
        result.push(result.pop() + 1);
      }

    }
    console.log(`val : ${val},  arr : ${arr}, result : ${result}`);
  }
  return result.length;
}
console.log(solution(arr1));