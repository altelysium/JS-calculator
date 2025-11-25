export function toggleModes(e) {
  changeIconsColor();
  disableSwitchButton(e);
  document.documentElement.classList.toggle("dark");
}

function changeIconsColor() {
  const icons = document.querySelectorAll(".icon");
  if (document.documentElement.className === "dark") {
    icons.forEach((icon) => {
      icon.setAttribute("stroke", "#000000");
    });
  } else {
    icons.forEach((icon) => {
      icon.setAttribute("stroke", "#FFFFFF");
    });
  }
}

function disableSwitchButton(e) {
  const modeButtons = document.querySelectorAll(".button_switch-modes");
  modeButtons.forEach((button) => {
    if (e.target.closest(".button") === button) {
      button.setAttribute("disabled", true);
      e.target.closest(".button").children[0].setAttribute("stroke-width", "1");
      button.children[0].setAttribute("stroke-width", "2");
    } else {
      button.removeAttribute("disabled");
      button.children[0].setAttribute("stroke-width", "1");
      e.target.closest(".button").children[0].setAttribute("stroke-width", "2");
    }
  });
}
