const filter = (iter, block) => ({
  next() {
    let {done, value} = iter.next();
    while(!done) {
      if(block(value)) return {done: false, value};
      ({done, value} = iter.next());
    }
    return {done};
  }
})

const map = (iter, block) => {

}

const iter = iter => ({[Symbol.iterator](){return iter;}});

const f = [...iter(map(filter([1,2,3,4,5][Symbol.iterator](), v=>v%2), v=>v*2))];
console.log(f);

// decorator pattern <=> 지연 리스트
// 

"[1,2,[3,4,[5,[6,7]]]]";
