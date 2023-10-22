if(0){const infinityScroll = async function*() {
  page = 1;
  while(true) {
    const json = loadPage(page);
    if(json.isEnd) break;
    else {
      yield json;
      page++;
    }
  }
}
const pageLoader = infinityScroll();
const pageRender = async () => {
  const {done, value} = await pageLoader();
  if(!done) render(value);
};}

if(1){
  const objEntries = function*(obj){
    for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
  };

  const convert = v => "" + v;

  const accuToString = (isObject, acc) => {
    const [START, END] = isObject ? "{}" : "[]";
    let result = "";
    if(acc.prev){
      let curr = acc;
      do{
         result = "," + (isObject ? `"${curr.value[0]}":${convert(curr.value[1])}` : convert(curr.value)) + result;
      } while(curr = curr.prev)
      result = result.substr(1);
    }
    return START + result + END;
  };

  const recursive = (iter, isObject, accu, prev) => {
     const {done, value} = iter.next();
     if(!done) {
        const v = isObject ? value[1] : value;
        switch(true){
        case Array.isArray(v):
            return recursive(v[Symbol.iterator](), false, null, {target:iter, isObject, k: isObject ? value[0] : "", accu, prev});
        case v && typeof v == "object":
            return recursive(objEntries(v), true, null, {target:iter, isObject, accu, k: isObject ? value[0] : "", prev});
        default:
            return recursive(iter, isObject, {prev:accu, value}, prev);
        }
      } else {
         let accuStr = accuToString(isObject, accu);
         if(prev) {
           return recursive(prev.target, prev.isObject, {prev:prev.accu, value:prev.isObject ? [prev.k, accuStr]: accuStr}, prev.prev);
         } else {
           return accuStr;
         }
      }
  };
  const stringify =v=>recursive(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), !Array.isArray(v), null, null);
  console.log(stringify({a:3, b: 5, c: [1,2, [3,4, {a:4, b:"bc"}, 7], 3], d:3}));
  console.log(JSON.stringify({a:3, b: 5, c: [1,2, [3,4, {a:4, b:"bc"}, 7], 3], d:3}));
  }
  //설계의 기본은 도메인을 이해했는가?
