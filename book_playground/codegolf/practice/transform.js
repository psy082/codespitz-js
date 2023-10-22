const words = ["hot", "dot", "dog", "lot", "log", "cog"];
const begin = "hit";
const target = "dot";

const Stream = class {
  static get(v) {
    return new Stream(v);
  }
  constructor(v) {
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg) {
    this.filters.push(v => gene(v, ...arg));
    console.log(this.filters.toString());
    return this;
  }
  *gene() {
    let v = this.v;
    for (const f of this.filters) {
      console.log(v);
      v = f(v);
    }
    yield* v;
  }
};

const difference = (word1, word2) => {
  const length = word1.length;
  let diff = 0;
  for (let i = 0; i < length; i++) {
    if (word1[i] !== word2[i]) diff++;
  }
  return diff;
}

const make_graph = (begin, words) => {
  let nodes = JSON.parse(JSON.stringify(words));
  nodes.unshift(begin);

  const length = nodes.length;
  let graph = {};
  for (let i = 0; i < length; i++) {
    let key = nodes.shift();
    graph[key] = [];
    for (node of nodes) {
      if (difference(key, node) == 1) {
        graph[key].push(node);
      }
    }
    nodes.push(key);
  }

  return graph;
}

const bfs = function*(graph, start_node) {
  let visited = [], need_visit = [];
  need_visit.push(start_node);

  while (need_visit.length > 0) {
    let key = need_visit.shift();
    if (!visited.includes(key)) {
      visited.push(key);
      need_visit = need_visit.concat(graph[key]);
    }
  }

  return visited;
}

let graph = make_graph(begin, words);
console.log(bfs(graph, begin));