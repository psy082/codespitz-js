const bfs = (graph, start_node) => {
  let visited = [], need_visited = [];
  need_visited.push(start_node);

  while (need_visited.length > 0) {
    let node = need_visited.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      need_visited = need_visited.concat(graph[node]);
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

console.log(bfs(graph, 'A'))