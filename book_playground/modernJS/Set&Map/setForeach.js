let set = new Set([1, 2]);

set.forEach((value, key, ownerSet) => {
  console.log(key + " " + value);
  console.log(ownerSet === set); //true
});

let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(value => this.output(value));
  }
}

processor.process(set);