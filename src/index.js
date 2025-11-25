import "./reset.css";
import "./style.css";
import { Calculator } from "./scripts/calculator";
import { toggleModes } from "./scripts/switch-modes";

const input = document.querySelector(".calculator__input");
const calculator = new Calculator(input);

function addCalculatorButtonListeners() {
  const modeButtons = document.querySelectorAll(".button_switch-modes");
  const buttons = document.querySelectorAll(".button_calculator");
  buttons.forEach((button) => {
    if (button.innerText === "AC") {
      button.addEventListener("click", calculator.clear.bind(calculator));
    } else if (button.innerText === "=") {
      button.addEventListener("click", calculator.calculate.bind(calculator));
    } else if (button.children.length === 1) {
      button.addEventListener(
        "click",
        calculator.deleteLastCharacter.bind(calculator),
      );
    } else if (button.innerText === "+/-") {
      button.addEventListener(
        "click",
        calculator.toggleUnaryOperator.bind(calculator),
      );
    } else if (
      Number.isNaN(Number(button.innerText)) &&
      button.innerText !== "."
    ) {
      button.addEventListener("click", () =>
        calculator.addOperator(button.innerText),
      );
    } else {
      button.addEventListener("click", () =>
        calculator.addDigit(button.innerText),
      );
    }
  });
  modeButtons.forEach((button) => {
    button.addEventListener("click", toggleModes);
  });
}
addCalculatorButtonListeners();
