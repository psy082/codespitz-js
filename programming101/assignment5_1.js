if(0) {
  let i = 0;
  const filter = function* (arr, block) {
    for (const v of arr) {
      i++;
      if(block(v)) {
        yield v;
      }
    }
  };
  const map = function* (arr, block) {
    i++;
    yield block(v);
  } 
  const copy = iter => {
    iter.filter = (block) => copy((function*() {
      for(const v of iter) {
        i++;
        if (block(v)) yield v;
      }
    })());
    iter.map = (block) => copy((function*() {
      for (const v of iter) {
        i++;
        yield block(v);
      }
    })());
    return iter;
  };

  const lazyArray = iter => copy(iter);
  const f = [...lazyArray([1,2,3,4,5]).filter(v=>v%2).map(v=>v*2)];
  console.log(f, i)
}

if(0){
  const Stream = class {
    constructor(iter) {
      this._iter = iter;
      this.iter = this._iter;
    }

    filter(block) {
      const _this = this;
      this.iter = (function *() {
        for (const v of _this.iter) {
          if (block(v)) yield v;
        }
      })();
      return this;
    }

    map(block) {
      const _this = this;
      this.iter = (function*() {
        for (const v of _this.iter) {
          yield block(v);
        }
      })();
      return this;
    }

    *done() {
      yield* this.iter; 
    }
  }

  const stream = new Stream([1,2,3,4,5]);
  const f = [...stream.filter(v=>v%2).map(v=>v*2).done()];
  console.log(f, stream.i)
}

if(1){
  const Stream = class {
    constructor(iter) {
      this.iter = iter;
    }

    filter(block) {
      const _this = this;
      this.iter = (function *() {
        for (const v of _this.iter) {
          if (block(v)) yield v;
        }
      })();
      console.dir(this.iter);
      return this;
    }

    map(block) {
      const _this = this;
      this.iter = (function*() {
        for (const v of _this.iter) {
          yield block(v);
        }
      })();
      console.dir(this.iter);
      return this;
    }

    *done() {
      yield* this.iter; 
    }
  }

  const stream = new Stream([1,2,3,4,5]);
  const f = [...stream.filter(v=>v%2).map(v=>v*2).done()];
  console.log(f)
}