const valueTest = Symbol();
const valueConvert = Symbol();

const Tag = class {
  [valueTest](v) {
    return this.reg.test(v);
  }
  [valueConvert](v) {
    console.log(`start: ${v}`);
    const tagReg = this.reg.exec(v);
    let length = tagReg[0].length;
    const tag = document.createElement(tagReg[1]);
    v = v.substr(length);
    console.log(`middle: ${v}`);
    while(this.attr.test(v)) {
      const attrReg = this.attr.exec(v);
      tag.setAttribute(attrReg[1], attrReg[2]);
      v = v.substr(attrReg[0].length);
      console.log(`loop: ${v}`);
      length = length + attrReg[0].length;
    }

    return {length, tag, type: this.type};
  }
}


const SelfClosingTag = class extends Tag {
  constructor() {
    super();
    this.type = 'self';
    this.reg = /^\s*<([A-z]+)\s*\/>\s*/;
    this.attr = /^\s*([A-z]+)="(.+)"\s*/;
  }
}

const OpenTag = class extends Tag {
  constructor() {
    super();
    this.type = 'normal';
    this.reg = /^\s*<([A-z]+)\s*>\s*/;
    this.attr = /^\s*([A-z]+)="(.+)"\s*/;
  }

}

const convertToTag = (() => {
  const tags = [new SelfClosingTag, new NormalTag];
  return str => {
    for(const tag of tags) {
      if(tag[valueTest](str)) return tag[valueConvert](str)
    }
    throw "invalid Tag name";
  }
})();

console.log((new SelfClosingTag)[valueConvert]('img alt="name" src="https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg" />'));

const htmlParser = str => {
  const recursive = (str, idx, parent, tree) => {
    if(str.length > idx - 1) return tree;
    switch(str[0]) {
      case '<':
        if(str[1] === '/') break;  
      case '>':

        break;
      default:
        break;


    }
  }
}