const con1 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

const make_dict = (connection, n) => {
  dict = {}
  for (let i = 0; i < n; i++) {
    let key = `${i}`;
    if (!(key in dict)) dict[key] = [];
    for (let j = i + 1; j < n; j++) {
      if (connection[i][j] == 1) {
        dict[key] = dict[key].concat([`${j}`])
        key = `${j}`;
        if (!(key in dict)) dict[key] = [];
        dict[key] = dict[key].concat([`${i}`])
      }
    }
  }
  return dict;
}


const dfs = (graph, start_node) => {
  let visited = [], need_visited = [];
  need_visited.push(start_node);

  while (need_visited.length > 0) {
    node = need_visited.pop();
    if (!visited.includes(node)) {
      visited.push(node);
      need_visited = need_visited.concat(graph[node]);
    }
  }
  return visited;
}

const solution = (n, computers) => {
  let networks = make_dict(computers, n);

  let need_visited = [];
  for (let i = 0; i < n; i++) need_visited.push(`${i}`);
  let count = 0;
  while (need_visited.length > 0 && count <= 3) {
    count++;
    let node = need_visited[0];
    let net = dfs(networks, node);
    need_visited = need_visited.filter(left => !(net.includes(left)));
  }
  return count;
}

console.log(solution(3, con1));