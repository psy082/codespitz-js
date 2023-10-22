const a = [1, "" ,"string", "ab\"c", true, undefined, null, _=>3, Symbol()];

const jsonStr = v => {
  const escLtr = "\\\'\"";
  let idx = 0
  for(l of escLtr) {
    while((idx = v.indexOf(l, idx)) > - 1) {
      v = v.substring(0, idx) + `\\${l}` + v.substring(idx + 1, v.length);
      idx = idx + 2;
    }
  }
  return `\"${v}\"`;
}

const valCheck = [v=>typeof v === "undefined" ? "null" : "", 
                  v=>v === null ? "null" : "", 
                  v=> v instanceof Function ? "null" : "", 
                  v=>typeof v === "symbol" ? "null" : "", 
                  v=>typeof v === "boolean" ? v.toString() : "",
                  v=>typeof v === "number" ? v.toString() : "",
                  v=>typeof v === "string" ? jsonStr(v) : ""];

const arrStringify = (_=>{
  const _arrStringify = (arr, idx) => {
    let result = "";
    if(idx > -1) for(f of valCheck) if((result = f(arr[idx]))) break;
    return idx > -1 ? _arrStringify(arr, idx - 1) + (idx ? "," : "") + result : result;
  }
  const arrStringify = arr => {
      if(!Array.isArray(arr)) throw "input must be an array";
      return `[${_arrStringify(arr, arr.length - 1)}]`;
  }
  return arrStringify;
})();

const arrStringify = (_=>{
  const _arrStringify = (arr, idx, str) => {
    let result = "";
    if(idx > -1) for(f of valCheck) if((result = f(arr[idx]))) break;
    return idx > -1 ? _arrStringify(arr, idx - 1, (idx ? "," : "") + result + str) : str;
  }
  const arrStringify = arr => {
      if(!Array.isArray(arr)) throw "input must be an array";
      return `[${_arrStringify(arr, arr.length - 1, "")}]`;
  }
  return arrStringify;
})();

const arrStringify = arr => {
  if(!Array.isArray(arr)) throw "input must be an array";
  let str = "";
  for(let idx = arr.length - 1; idx > -1; idx = idx - 1) {
    if(idx > -1) for(f of valCheck) if((result = f(arr[idx]))) break;
    str = (idx ? "," : "") + result + str;
  }
  return `[${str}]`;
}

