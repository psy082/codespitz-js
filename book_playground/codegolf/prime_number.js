const prime1 = number => {
  let searchArr = [2],
    primeArr = [];
  let curr = 2,
    i = 3,
    j;
  while (i <= number) {
    searchArr.push(i);
    i += 2;
  }
  primeArr.push(curr);
  while (curr * curr <= number) {
    let tempArr = [];
    for (n of searchArr) if (n % curr !== 0) tempArr.push(n);
    searchArr = tempArr;
    primeArr.push((curr = searchArr.shift()));
  }
  return primeArr.concat(searchArr);
};

const result = prime1(100);
console.log(result);
