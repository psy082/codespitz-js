const test_board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
const test_move = [1,5,3,5,1,2,1,4];

const checkStart = (board, len) => {
  const startPoints = Array(len).fill(0);
  for(let j = 0; j < len; j++){
      for(let i = 0; i < len; i++){
          if(board[i][j]) {
              startPoints[j] = i;
              break;
          }
      }
  }
  return startPoints
}

const getIndex = (startPoints, line, max) => {
  if(startPoints[line - 1] === max) return -1;
  startPoints[line - 1] = startPoints[line - 1] + 1;
  return startPoints[line - 1] - 1;
}

const putInBascket = (basket, item) => {
  const len = basket.length;
  if(!len) basket.push(item);
  else {
    if(basket[len - 1] === item) {
      basket.pop();
      return true;
    }
    else basket.push(item);
  }
  return false;
}

const solution= (board, move) => {
  const len = board.length;
  const startPoints = checkStart(board, len);
  const basket = [];
  let count = 0;
  for(const line of move) {
    let index;
    if((index = getIndex(startPoints, line, len)) !== -1){
      if(putInBascket(basket, board[index][line - 1])) {
        count = count + 1;
      }
    }
  }
  return count * 2;
}

console.log(solution(test_board, test_move));