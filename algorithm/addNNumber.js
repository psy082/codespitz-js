const solution = (estimates, k) => {
  let count = 0, total = 0, maxTotal = 0;
  for(let i = 0; i < estimates.length; i++) {
    total = total + estimates[i];
    if(count < k) count = count + 1;
    else total = total - estimates[i - k];
    maxTotal = Math.max(total, maxTotal);
  }
  return maxTotal;
}

console.log(solution([10, 1, 10, 1, 1, 4, 3, 10], 6));