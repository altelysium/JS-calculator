export const operators = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "~": 3,
};
let tokens = [];

export function tokenize(expression) {
  let currentIteration = "";
  tokens = [];

  for (let i = 0; i < expression.length; i++) {
    const currentChar = expression[i];

    if (currentChar === "(" || currentChar === ")") {
      if (currentIteration) {
        tokens.push(currentIteration);
        currentIteration = "";
      }
      tokens.push(currentChar);
      continue;
    }

    if (operators[currentChar]) {
      if (
        currentChar === "-" &&
        (i === 0 || operators[expression[i - 1]] || expression[i - 1] === "(")
      ) {
        tokens.push("~");
        continue;
      }
      if (currentIteration) {
        tokens.push(currentIteration);
        currentIteration = "";
      }
      tokens.push(currentChar);
      continue;
    }
    currentIteration += currentChar;
  }

  if (currentIteration) tokens.push(currentIteration);
  return tokens;
}

export function convertToRPN(tokens) {
  const rpn = [];
  const stack = [];
  for (let token of tokens) {
    if (!operators[token] && token !== "(" && token !== ")") {
      rpn.push(token);
      continue;
    }
    if (token === "(") {
      stack.push(token);
      continue;
    }
    if (token === ")") {
      while (stack.length && stack.at(-1) !== "(") {
        rpn.push(stack.pop());
      }
      stack.pop();
      continue;
    }
    while (
      stack.length > 0 &&
      stack.at(-1) !== "(" &&
      operators[stack.at(-1)] >= operators[token]
    ) {
      rpn.push(stack.pop());
    }
    stack.push(token);
  }
  return rpn.concat(stack.reverse());
}

export function evaluateRPN(tokens) {
  const stack = [];
  let operations = {
    "+": (a, b) => b + a,
    "-": (a, b) => b - a,
    "*": (a, b) => b * a,
    "/": (a, b) => b / a,
    "%": (a, b) => b % a,
    "~": (a) => -a,
  };

  for (let token of tokens) {
    if (operations[token]) {
      if (token === "~") {
        stack.push(operations[token](Number(stack.pop())));
        continue;
      }
      stack.push(operations[token](Number(stack.pop()), Number(stack.pop())));
    } else {
      stack.push(Number(token));
    }
  }
  return Number(stack[0]);
}
