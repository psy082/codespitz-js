const converter = v => {
  const convertTable = [
    {regex: /^\s*([0-9]+(:?.[0-9]+]?))\s*,?/, convert: Number},
    {regex: /^\s*(true|false)\s*,?/, convert: v=>v==="true"},
    {regex: /^\s*(null)\s*,?/, convert: _=>null },
    {regex: /^\s*"(.*)"\s*,?/, convert: v=>v},
    {regex: /^\s*Test()\s*,?/, convert: v=>{}}
  ];

  let value, length = 0;
  for(const {regex, convert} of convertTable) {
    let result;
    if((result = regex.exec(v))) {
      value = convert(result[1]);
      length = result[0].length;
      break;
    }
  }
  return {value, length};
}

const parse = (() => {
  const recursive = (str, acc, stack) => {
    const v = str.trim();
    if(!v) return acc;
    switch(v[0]){
      case '[':
        stack.push(acc);
        return recursive(v.substr(1), [], stack);
      case ']':
        const prev = stack.pop();
        prev.push(acc);
        return recursive(v.substr(1), prev, stack);
      default:
        const {value, length} = converter(v);
        if(typeof value === "undefined") throw "invalid value: " + v;
        acc.push(value);
        return recursive(v.substr(length), acc, stack);
    }
  }
  return str => recursive(str, [], []);
})();

console.log(parse("[   1,2,3,[1,2,[3,4]]]"));

// class Test {
//   constructor (v1, v2, v3) {
//       this.v1 = v1;
//       this.v2 = v2;
//       this.v3 = v3;
//   }
// }

// {
// const definedClass = (constructor) => ((...params) => new Function('...params', `return new ${constructor}(${params.toString()});`));
// const instance = definedClass('Test')(1, 2, 3);
// console.dir(instance());
// }