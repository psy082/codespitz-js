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

let hughMap = []

const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const makeHughMap = (size) => {
  let map = [];
  for (let i = 0; i < size * size; i++) {
    map.push(getRandomArbitrary(1, 5));
  }
  return map;
}

const printMap = (map, size) => {
  for (let i = 0; i < size; i++) {
    let s = "";
    for (let j = 0; j < size; j++) {
      let c = map[i + j * size];
      s += c + ", "
    }
    console.log(s);
  }
}

let size = 150;
hughMap = makeHughMap(size);
printMap(hughMap, size);

// const shortest_path = (w, h, mapArr, x1, y1, x2, y2) => {
//   const resArr = [];

//   const arr = [];
//   for (let i = 0; i < w * h; i++) arr[i] = Infinity;

//   // 이동 비용 계산
//   const stck = [];
//   let cnt = 0;
//   stck.unshift({ x: x2, y: y2, cst: -mapArr[x2 + y2 * w] });
//   while (stck.length) {
//     let p = stck.shift();
//     let x = p.x;
//     let y = p.y;
//     let cst = p.cst + mapArr[x + y * w];
//     if (cst >= arr[x + y * w]) continue;
//     arr[x + y * w] = cst;
//     cnt++;
//     if (x > 0) stck.unshift({ x: x - 1, y: y, cst: cst });
//     if (y > 0) stck.unshift({ x: x, y: y - 1, cst: cst });
//     if (x < w - 1) stck.unshift({ x: x + 1, y: y, cst: cst });
//     if (y < h - 1) stck.unshift({ x: x, y: y + 1, cst: cst });
//   }

//   // 디버그용 출력
//   for (let y = 0; y < h; y++) {
//     let s = "";
//     for (let x = 0; x < w; x++) {
//       let c = arr[x + y * w];
//       s += (c < 10 ? " " + c : c) + ",";
//     }
//     console.log(s);
//   }
//   console.log(cnt);
//   let x = x1;
//   let y = y1;

//   cnt = 0;
//   let cst = arr[x, y];
//   while (cst) {
//     resArr.push([x, y]);

//     let newCst = Infinity, tmp;
//     let newX, newY;

//     if (x > 0 && (tmp = arr[x - 1 + y * w]) < cst) {
//       newCst = tmp; newX = x - 1; newY = y;
//     }
//     if (y > 0 && (tmp = arr[x + (y - 1) * w]) < cst) {
//       newCst = tmp; newX = x; newY = y - 1;
//     }
//     if (x < w - 1 && (tmp = arr[x + 1 + y * w]) < cst) {
//       newCst = tmp; newX = x + 1; newY = y;
//     }
//     if (y < h - 1 && (tmp = arr[x + (y + 1) * w]) < cst) {
//       newCst = tmp; newX = x; newY = y + 1;
//     }
//     cst = newCst;
//     x = newX;
//     y = newY;
//     cnt++;
//   }
//   resArr.push([x2, y2]);
//   console.log(cnt);
//   return resArr;

// }

// console.log(shortest_path(10, 10, mapCst, 4, 0, 5, 9));