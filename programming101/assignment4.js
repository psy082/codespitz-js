const rNewLine = /[\r\n]/g;
const rQuat = /"/g;
const el = {
  number: v=>v.toString(),
  boolean: v=>v.toString(),
  string: v=>`"${v.replace(rNewLine, "\\n").replace(rQuat, "\\\"")}"`,
  stringify(v) {
    return v === null ? "null" : this[typeof v]?.(v) ?? undefined;
  }
};

const a = {num: 1, emp: "" , str: "string", esStr: "ab\"c", bln: true, udn: undefined, nl: null, fn :_=>3, sb: Symbol(), arr: ["avda", "wev"]};

const getObjEntries = function* (obj) {
  for(const k of Object.getOwnPropertyNames(obj)){
    yield [k, obj[k]];
  }
}

const objToString = finalNode => {
  let result = "", curr = finalNode;
  console.log(curr);
  const arr = [];
  do { curr.val[1] ? arr.unshift(curr.val) : false; } while(curr = curr.prev);
  for(const [k, v] of arr) result += "," + `${k}:${v}`;
  return "{" + result.substring(1) + "}";
}

if(1) {
const stringify = (() => {
  const recursive = (target, acc) => {
    const {done, value} = target.next();
    if(!done) {
      return recursive(target, {prev: acc, val: [el.stringify(value[0]), el.stringify(value[1])]});
    } else {
      return objToString(acc);
    }
  }
  const stringify = obj => {
    if(!(obj instanceof Object)) throw "Invalid Object";
    return recursive(getObjEntries(obj), null);
  }
  return stringify;
})();

console.log(stringify(a));
console.log(JSON.stringify(a));
}

if(0){
const stringify = obj => {
  if(!(obj instanceof Object)) throw "Invalid Object";
  const target = getObjEntries(obj);
  let prev = null;
  while(true) {
    const {done, value} = target.next();
    if(!done) {
      prev = {prev, val: [el.stringify(value[0]), el.stringify(value[1])]};
    } else {
      return objToString(prev);
    }
  }
};

console.log(stringify(a));
console.log(JSON.stringify(a));
}