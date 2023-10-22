const rNewLine = /[\r\n\l]/g;
const rQuat = /"/g;

const funcTable = v => {};

const elTable = {
  number: v=>v.toString(),
  boolean: v=>v.toString(),
  string: v=>`"${v.replace(rNewLine, "\\n").replace(rQuat, "\\\"")}"`,
  stringify(v) {
    return this[typeof v]?.(v) ?? "null";
  }
};

const arrToString = arr => {
  let result = "";
  for(const el of arr) result += ":" + el;
  return `{${result.substring(1)}}`;
}

const EMPTY = {};
if(1){
  const stringify = (() => {
    const _stringify = (arr, idx, acc, stack) => {
      if(arr.length == 0) return "[]";
      if(idx < arr.length) {
        if(Array.isArray(arr[idx])) {
          stack.push([arr, idx + 1, acc]);
          return _stringify(arr[idx], 0, [] ,stack);
        } else {
          acc.push(elTable.stringify(arr[idx]));
          return _stringify(arr, idx + 1, acc, stack);
        }
      } else {
        const accStr = arrToString(acc)
        const prev = stack.pop();
        if(prev) {
          const [prevArr, prevIdx, prevAcc] = prev;
          prevAcc.push(accStr);
          return _stringify(prevArr, prevIdx, prevAcc, stack)
        } else return accStr;
      }
    };
    const stringify = arr => {
      if(!Array.isArray(arr)) throw "invalid arr";
      return _stringify(arr, 0, [], []);           // 엄밀하게는 []도 _stringify가 처리할 수 있어야 한다.
    }  
    return stringify;
  })();

  const arr = [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]];
  console.log(stringify(arr));
  console.log(JSON.stringify(arr));
}


if(0){
  const stringify = (() => {
    const _stringify = (arr, idx, acc, stack) => {
      if(arr.length == 0) return "[]";
      if(idx < arr.length) {
        if(Array.isArray(arr[idx])) {
          stack.push([arr, idx + 1, acc]);
          return _stringify(arr[idx], 0, [] ,stack);
        } else {
          acc.push(elTable.stringify(arr[idx]));
          return _stringify(arr, idx + 1, acc, stack);
        }
      } else {
        const accStr = arrToString(acc)
        const prev = stack.pop();
        if(prev) {
          const [prevArr, prevIdx, prevAcc] = prev;
          prevAcc.push(accStr);
          return _stringify(prevArr, prevIdx, prevAcc, stack)
        } else return accStr;
      }
    };
    const stringify = arr => {
      if(!Array.isArray(arr)) throw "invalid arr";
      return _stringify(arr, 0, [], []);           // 엄밀하게는 []도 _stringify가 처리할 수 있어야 한다.
    }  
    return stringify;
  })();

  const arr = [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]];
  console.log(stringify(arr));
  console.log(JSON.stringify(arr));
}

if(0)
{
  const stringify = arr => {
    if(!Array.isArray(arr)) throw "invalid arr";
    let result = EMPTY;
    if(arr.length == 0) result = "[]";
    else {
      let acc = "";
      const stack = [];
      let idx = 0;
      while(true) {
        if(idx < arr.length) {
          if(Array.isArray(arr[idx])) {
            stack.push([arr, idx]);
            acc = acc + ',[', arr = arr[idx], idx = 0;
          } else {
            acc = acc + (idx ? "," : "") + `${el.stringify(arr[idx])}`;
            idx = idx + 1;
          }
        } else {
          if(stack.length > 0) {
            const [pArr, pIdx] = stack.pop();
            acc = acc + ']', arr = pArr, idx = pIdx + 1;
          } else {
            result = `[${acc}]`;
            break;
          }
        }
      }
    }
    return result;
  }
}

