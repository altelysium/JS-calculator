import { convertToRPN, tokenize, evaluateRPN, operators } from "./RPN";
let previousExpression = document.querySelector(".calculator__expression");

export class Calculator {
  constructor(input) {
    this.input = input;
  }
  currentNumber = "";
  previousNumber = "";
  result = "";

  addDigit(number) {
    if (this.input.value.at(-1) !== ")" && this.input.value.length < 15) {
      if (this.result !== "") {
        this.result = "";
        this.input.value = "";
        previousExpression.innerText = "";
      }
      this.currentNumber += number;
      this.input.value += number;
    }
    this.changeFontSize();
  }

  addOperator(operator) {
    if (this.input.value.length < 15) {
      if (this.result !== "") {
        this.result = "";
        previousExpression.innerText = "";
      }
      if (this.input.value === "") {
        this.input.value += "0" + operator;
      }
      if (operators[this.input.value.at(-1)]) {
        this.input.value = this.input.value.slice(0, -1) + operator;
      } else {
        this.input.value += operator;
      }
      previousExpression.innerText = "";
      this.previousNumber = this.currentNumber;
      this.currentNumber = "";
      this.changeFontSize();
    }
  }

  toggleUnaryOperator() {
    if (this.currentNumber !== "") {
      if (this.currentNumber[1] === "-") {
        this.currentNumber = this.currentNumber.slice(2, -1);
        this.input.value =
          this.input.value.slice(0, -this.currentNumber.length - 3) +
          this.currentNumber;
      } else {
        this.currentNumber = `(-${this.currentNumber})`;
        this.input.value =
          this.input.value.slice(0, -this.currentNumber.length + 3) +
          this.currentNumber;
      }
    }
    this.changeFontSize();
  }

  clear() {
    this.input.value = "";
    this.currentNumber = "";
    this.previousNumber = "";
    previousExpression.innerText = "";
    this.changeFontSize();
  }

  deleteLastCharacter() {
    this.changeFontSize();
    if (this.currentNumber.includes("-")) {
      if (this.currentNumber.length > 4) {
        this.currentNumber = `${this.currentNumber.slice(0, -2)})`;
        this.input.value =
          this.input.value.slice(0, -this.currentNumber.length - 1) +
          this.currentNumber;
      } else {
        this.currentNumber = "";
        this.input.value = this.input.value.slice(0, -4);
      }
    } else {
      this.currentNumber.length === 0
        ? (this.currentNumber = this.previousNumber)
        : (this.currentNumber = this.currentNumber.slice(0, -1));
      this.input.value = this.input.value.slice(0, -1);
    }
    this.changeFontSize();
  }

  changeFontSize() {
    if (this.input.value.length > 7) {
      this.input.classList.add("calculator__input_complex");
    } else {
      this.input.classList.remove("calculator__input_complex");
    }
  }

  calculate() {
    if (!operators[this.input.value.at(-1)]) {
      previousExpression.innerText = this.input.value;
      this.result = evaluateRPN(convertToRPN(tokenize(this.input.value)));
      String(this.result).length < 15
        ? (this.input.value = this.result)
        : (this.input.value = String(this.result).slice(0, 15));
      this.currentNumber = this.result;
      this.changeFontSize();
      return this.input.value;
    }
  }
}
