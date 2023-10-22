const mapCst = [5, 5, 4, 2, 1, 1, 1, 2, 2, 3,
  5, 4, 3, 2, 1, 1, 2, 2, 3, 4,
  5, 4, 2, 1, 1, 2, 2, 4, 5, 5,
  4, 4, 2, 1, 2, 2, 3, 3, 4, 5,
  4, 3, 1, 1, 4, 3, 3, 3, 4, 5,
  3, 1, 1, 5, 4, 3, 2, 3, 4, 5,
  2, 1, 3, 4, 3, 3, 2, 2, 3, 4,
  1, 1, 3, 4, 3, 2, 1, 1, 2, 3,
  2, 1, 1, 3, 4, 2, 2, 3, 4, 4,
  3, 2, 1, 1, 3, 3, 3, 3, 4, 5]

const shortest_path = (w, h, mapArr, x1, y1, x2, y2) => {
  // 정답 경로
  const resArr = [];
  // 합계 비용 배열
  const arr = [];

  for (let i = 0; i < w * h; i++) arr[i] = Infinity;

  const genCstMap = (x, y, cst) => {
    cst += mapArr[x + y * w];
    if (cst >= arr[x + y * w]) return;
    arr[x + y * w] = cst;

    if (x > 0) genCstMap(x - 1, y, cst);
    if (y > 0) genCstMap(x, y - 1, cst);
    if (x < w - 1) genCstMap(x + 1, y, cst);
    if (y < h - 1) genCstMap(x, y + 1, cst);
  }
  genCstMap(x2, y2, -mapArr[x2 + y2 * w]);

  // 디버그용 출력
  for (let y = 0; y < h; y++) {
    let s = "";
    for (let x = 0; x < w; x++) {
      let c = arr[x + y * w];
      s += (c < 10 ? " " + c : c) + ",";
    }
    console.log(s);
  }

  const bckMv = (x, y) => {
    let cst = Infinity, tmp;
    let x2, y2;
    if (x > 0 && (tmp = arr[(x - 1) + y * w]) < cst) {
      cst = tmp; x2 = x - 1; y2 = y;
    }
    if (y > 0 && (tmp = arr[x + (y - 1) * w]) < cst) {
      cst = tmp; x2 = x; y2 = y - 1;
    }
    if (x < w - 1 && (tmp = arr[(x + 1) + y * w]) < cst) {
      cst = tmp; x2 = x + 1; y2 = y;
    }
    if (y < h - 1 && (tmp = arr[x + (y + 1) * w]) < cst) {
      cst = tmp; x2 = x; y2 = y + 1;
    }
    if (cst == 0) return;
    resArr.push(x2, y2);
    bckMv(x2, y2);
  }
  resArr.push(x1, y2);
  bckMv(x1, y1);
  resArr.push(x2, y2);

  return resArr;
}
console.log(shortest_path(10, 10, mapCst, 4, 0, 5, 9));