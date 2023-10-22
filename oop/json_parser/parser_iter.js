let jText = {
  "name": "dongho",
  "flag": ["node", "text", "root", { "family": ["wel", "tel", "ptel", -12.6] }],
  "age": 27,
  "weight": -73.5,
  "variables": { "new": { "first": "{second}, [third]" } },
  "marrage": false,
  "graduate": true,
  "occupy": null
};
jText['addition'] = { "add": [1, 2, 3, 4, 5] };
jText = JSON.stringify(jText);
console.log(jText);


const parser = input => {
  const result = { back: null, tag: null };
  let curr = { back: result, tag: null }, i = 0, j = input.length;
  while (curr = curr.back) {
    while (i < j) {
      let cursor = i, token = input[cursor], name = "";
      switch (token) {
        case '"':
          let idx = input.indexOf('"', cursor + 1);
          curr.tag[name] = input.substring(cursor + 1, idx);
          i = idx + 1;
          break;
        case 'n':
          break;
        case 't':
          break;
        case 'f':
          break;
        case '[':
          break;
        case '{':
          break;
        default:
          break;
      }
    }
  }
}