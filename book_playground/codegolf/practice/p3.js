const account = {};

let req = ["CREATE 3a 10000", "CREATE 3a 20000", "CREATE 2bw 30000"];
function parsing(reqs) {
  let parsed_reqs = [];
  for (req of reqs) {
    let newReq = {};
    let words = req.split(' ');
    newReq["order"] = words[0];
    newReq["number"] = words[1];
    newReq["amount"] = words[2];
    parsed_reqs.push(newReq);
  }
  return parsed_reqs;
}

function create(number, amount) {
  if (number in account) return 403;
  account[number] = amount;
  return 200;
}

function deposit(number, amount) {
  if (!(number in account)) return 404;
  account[number] = account[number] + amount;
  return 200;
}

function withdraw(number, amount) {
  if (!(number in account)) return 404;
  if (account[number] < amount) return 403;
  account[number] = account[number] - amount;
  return 200;
}


function solution(reqs) {
  let result = [];
  let parsed_reqs = parsing(reqs);
  for (req of parsed_reqs) {
    switch (req["order"]) {
      case 'CREATE':
        result.push(create(req["number"], req["amount"]));
        break;
      case 'DEPOSIT':
        result.push(deposit(req["number"], req["amount"]));
        break;
      case 'WITHDRAW':
        result.push(withraw(req["number"], req["amount"]));
        break;
    }
  }
  return result;
}

console.log(solution(req));