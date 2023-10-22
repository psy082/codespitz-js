function solution(v) {
  let coords = [{}, {}];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      if (v[i][j] in coords[j]) coords[j][v[i][j]] += 1;
      else coords[j][v[i][j]] = 1;
    }
  }
  let answer = [];
  for (let j = 0; j < 2; j++) {
    for (coord in coords[j]) {
      if (coords[j][coord] === 1) answer.push(parseInt(coord));
    }
  }
  return answer;
}

v1 = [[1, 4], [3, 4], [3, 10]];
v2 = [[1, 1], [2, 2], [1, 2]];
v = v2;

console.log("*");
