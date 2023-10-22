const dfs = (graph, start_node) => {
  let visited = [], need_visit = [];
  need_visit.push(start_node);

  while (need_visit.length > 0) {

    let node = need_visit.pop();
    if (!visited.includes(node)) {

      visited.push(node);
      need_visit = need_visit.concat(graph[node].reverse());

    }
  }

  return visited;
}

let graph = {};
graph['A'] = ['B', 'C'];
graph['B'] = ['A', 'D'];
graph['C'] = ['A', 'G', 'H', 'I'];
graph['D'] = ['B', 'E', 'F'];
graph['E'] = ['D'];
graph['F'] = ['D'];
graph['G'] = ['C'];
graph['H'] = ['C'];
graph['I'] = ['C', 'J'];
graph['J'] = ['I'];
console.log(graph)
console.log(dfs(graph, 'A'));