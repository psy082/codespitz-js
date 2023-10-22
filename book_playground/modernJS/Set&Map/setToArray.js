let set = new Set([1, 2, 3, 3, 3, 4, 5]),
  arr = [...set];

console.log(array);

let eliminatDuplicates = (items) => {
  return [...new Set(items)];
}

let numbers = [1, 2, 3, 3, 3, 4, 5],
  noDuplicates = eliminatDuplicates(numbers);

console.log(noDuplicates);