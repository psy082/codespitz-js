const distance = (point1, point2) => {
  return (point1[0] - point2[0])**2 + (point1[1] - point2[1])**2;
}

const getKey = (index1, index2) => {
  return index1 < index2 ? `${index1},${index2}` : `${index2},${index1}`;
}

const sortByDist = (points) => {
  const len = points.length;
  const dists = new Map;
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len; j++){
      if(i === j) continue;
      let dist = distance(points[i], points[j]);
      if(dists.has(i)) dists.set(i, dists.get(i) + dist);
      else dists.set(i, dist);
    }
  }
  
  const result = [...dists.entries()].sort((a, b) => a[1] - b[1]).map(([key, value]) => key);
  return result.map(index => points[index]);
}

console.log(sortByDist([[1,1],[5,4],[3,3]]));