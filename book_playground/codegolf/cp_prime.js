const prime1 = end => {
  const num = [2];
  for (let i = 3; i <= end; i += 2) num.push(i);
  for (let i = 1, j = num.length, curr; i < j; i++) {
    if ((curr = num[i])) {
      const min = curr * curr;
      if (end < min) break;
      for (let k = (min - 1) / 2; k < j; k += curr) {
        if (num[k] % curr == 0) num[k] = 0;
      }
    }
  }
  return num.filter(v => v);
};

const result = prime1(1000);
console.log(result);
