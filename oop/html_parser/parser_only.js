const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor);
  curr.tag.children.push({
    type: 'text', text: input.substring(cursor, idx)
  });
  return idx;
}


const elementNode = (input, cursor, idx, curr) => {
  const isClose = input[idx - 1] === '/';
  const tag = { name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)), type: 'node', children: [] };
  curr.tag.children.push(tag);
  if (!isClose) {
    return tag;
  }
  return null;
}


// curr라는 context와 i라는 index가 while루프를 통제된다. 즉 각각의 node함수들 외부에서 값들이 변경되면서 코드가 진행된다.
const parser = input => {
  input = input.trim();
  const result = { back: null, tag: { name: 'ROOT', type: 'node', children: [] } };
  let curr = { back: result, tag: null }, i = 0, j = input.length;
  while (curr = curr.back) {
    while (i < j) {
      const cursor = i;
      if (input[cursor] === '<') {
        const idx = input.indexOf('>', cursor);
        i = idx + 1;
        if (input[cursor + 1] === '/') {
          break;
        } else {
          let tag;
          if (tag = elementNode(input, cursor, idx, curr)) {
            curr = { back: curr, tag }
          }
        }
      }
      else {
        i = textNode(input, cursor, curr);
      }
    };
  }
  return result.tag;
};

console.log('--------', parser(`<div>
a
<a>b</a>
c
<img/>
d
</div>

`));
