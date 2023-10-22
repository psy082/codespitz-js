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

const textValue = (input, cursor) => {
  const idx = input.indexOf('"', cursor + 1);
  const value = input.substring(cursor + 1, idx);
  return { idx: idx + 1, value };
}

const nullValue = (cursor) => {
  const idx = cursor + 4;
  const value = null;
  return { idx, value };
}

const booleanValue = (input, cursor) => {
  const value = input[cursor] === 't' ? true : false;
  const idx = cursor + (value ? 4 : 5);
  return { idx, value };
}

const numberValue = (input, cursor) => {
  let idx = cursor;
  let number = ""
  let digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
  while (digit.includes(input[idx])) {
    number = number + input[idx++];
  }
  number = number.includes('.') ? parseFloat(number) : parseInt(number);
  return { idx, value: number };
}

const arrayValue = (input, cursor) => {
  let i = cursor, arr = [];
  do {
    let { idx, value } = valueNode(input, i + 1);
    i = idx;
    arr.push(value);
  } while (input[i] === ',')

  return { idx: i + 1, value: arr };
}

const jsonValue = (input, cursor) => {
  let i, obj = {};
  do {
    i = input.indexOf(':', cursor);
    if (i > -1) {
      const name = input.substring(cursor + 2, i - 1);
      let { idx, value } = valueNode(input, i + 1);
      cursor = i = idx;
      obj[name] = value;
    }
  } while (input[i] === ',')

  return { idx: i + 1, value: obj };
}

const valueNode = (input, i) => {
  const cursor = i, token = input[cursor];
  switch (token) {
    case '"':
      return textValue(input, cursor);
    case 'n':
      return nullValue(cursor);
    case 't':
    case 'f':
      return booleanValue(input, cursor);
    case '[':
      return arrayValue(input, cursor);
    case '{':
      return jsonValue(input, cursor);
    default:
      return numberValue(input, cursor);
  }
}

const parser = input => {
  let result = valueNode(input, 0);
  return result.value;
}

console.log(parser(jText));