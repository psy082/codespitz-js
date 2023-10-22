const exps = ['12+3*', '23*1+', '123*+'];

const simpleCalculator = input => {
  let i = 0, j = input.length;
  const stack = [];
  while (i < j) {
    let token = input[i++];
    switch (token) {
      case '+':
        stack.push(stack.pop() + stack.pop());
        break;
      case '-':
        stack.push(stack.pop() - stack.pop());
        break;
      case '*':
        stack.push(stack.pop() * stack.pop());
        break;
      case '/':
        stack.push(stack.pop() / stack.pop());
        break;
      default:
        stack.push(parseInt(token));
        break;
    }
    console.log(stack);
  }
  return stack.pop();
}

for (let exp of exps) {
  console.log(simpleCalculator(exp));
}