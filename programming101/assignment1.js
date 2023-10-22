const c = 2;
const arr = [1, 2, 3, 4, 5, 6, 7];

const validator = [
  (arr) => Array.isArray(arr),
  (arr) => {}
]

// recursive 
if(c === 0) {
    const arrSum = (_=>{
      const _arrSum = (arr, idx) => idx > -1 ? arr[idx] + _arrSum(arr, idx - 1) : 0;
      const arrSum = arr => _arrSum(arr, arr.length - 1);
      return arrSum;
    })();
    console.log(arrSum([]));
    console.log(arrSum(arr));
}

// tail recursive optimization 
if(c === 1) {
    const arrSum = (_=>{
      const _arrSum  = (arr, idx, acc) => idx > -1 ? _arrSum(arr, idx - 1, acc + arr[idx]) : acc;
      const arrSum = arr => _arrSum(arr, arr.length - 1, 0);
      return arrSum
    })();
    console.log(arrSum([]));
    console.log(arrSum(arr));
}

// recursive to for loop 
if(c === 2) {
    const arrSum = arr => {
      let acc = 0;
      for(let idx = arr.length - 1; idx > -1; idx = idx - 1) acc = acc + arr[idx];
      return acc;
    };
    console.log(arrSum([]));
    console.log(arrSum(arr));
}