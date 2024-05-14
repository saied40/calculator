// const typingDiv = document.querySelector(".container .top .typing");
// const resultDiv = document.querySelector(".container .top .result");

const setErr = (errorText = "") => (document.getElementById("err").innerHTML = errorText);
let allKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "Delete"];
const voice = new Audio("./click.wav");

document.querySelectorAll(".container section button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.target.classList.add("clicked");
    voice.play();
    setTimeout(() => {
      e.target.classList.remove("clicked");
    }, 40);
  })
);

function handleDot() {
  let arr = typingDiv.innerHTML.split(" ");
  if (!arr[arr.length - 1].includes(".")) {
    typingDiv.innerHTML += ".";
    setErr();
  } else {
    setErr("You can't have multiple dots in the same number");
  }
};

function calculate() {
  let val = typingDiv.innerHTML, result, errMsg;

  if (val.includes("<") && val.includes(">")) {
    val = val.replaceAll("<span>", "");
    val = val.replaceAll("</span>", "");
  }

  try {
    result = eval(val);
  } catch (err) {
    errMsg =
      (err instanceof EvalError ? "EvalError: " : "Error: ") + err.message;
    setErr(errMsg);
  }

  resultDiv.innerHTML = parseFloat(result.toFixed(3));
};

function del() {
  let temp = typingDiv.innerHTML.endsWith("</span> ") ? 16 : 1;
  typingDiv.innerHTML = typingDiv.innerHTML.substring(
    0,
    typingDiv.innerHTML.length - temp
  );
  if (typingDiv.innerHTML == "") {
    typingDiv.innerHTML = "0";
  }
  setErr();
  resultDiv.innerHTML = "";
  // calculate();
};

addEventListener("keydown", (e) => {
  if (e.key === ".") {
    document.querySelector(`.kDot`).click();
    // handleDot();
  } else if (e.key === "Delete") {
    document.querySelector(`.del.all`).click();
    // del();15
  } else if (e.keyCode == 8) {
    document.querySelector(`.kDelete`).click();
    // del();15
  } else if (e.key === "=" || e.key === "Enter") {
    document.querySelector(`.kEqual`).click();
    // calculate();
  } else if (e.key === "+") {
    document.querySelector(`.kPlus`).click();
  } else if (e.key === "*") {
    document.querySelector(`.kMul`).click();
  } else if (e.key === "/") {
    document.querySelector(`.kDev`).click();
  } else {
    allKeys.forEach((key1) => {
      if (e.key === key1) {
        document.querySelector(`.k${key1}`).click();
      }
    });
  }
});

function chTheme(e) {
  e.classList.toggle("toggle-theme");
  let html = document.body.parentElement;
  html.getAttribute("data-theme") == "dark"
    ? html.setAttribute("data-theme", "light")
    : html.setAttribute("data-theme", "dark");
};

function allClear() {
  typingDiv.innerHTML = "0";
  resultDiv.innerHTML = "";
  // (nums = []), (operators = [])
  setErr();
};

function handlePlusMinus() {
  if (typingDiv.innerHTML == "0") {
    typingDiv.innerHTML = "-";
  } else if (
    typingDiv.innerHTML.endsWith(" ") ||
    typingDiv.innerHTML.endsWith("(")
  ) {
    typingDiv.innerHTML += "-";
  } else if (typingDiv.innerHTML.endsWith("-")) {
    typingDiv.innerHTML =
      typingDiv.innerHTML.substring(0, typingDiv.innerHTML.length - 1) + "+";
  } else if (typingDiv.innerHTML.endsWith("+")) {
    typingDiv.innerHTML =
      typingDiv.innerHTML.substring(0, typingDiv.innerHTML.length - 1) + "-";
  }
};

function handleBtn(e) {
  if (typingDiv.innerHTML == "0") {
    typingDiv.innerHTML = e.innerHTML;
  } else {
    typingDiv.innerHTML += e.innerHTML;
  }
  setErr();
};

function handleOperator(e) {
  if (typingDiv.innerHTML.endsWith("</span> ")) {
    typingDiv.innerHTML = typingDiv.innerHTML.slice(0, -16) + ` <span>${e.innerHTML}</span> `;
    // operators.pop(), operators.push(e.target.innerHTML);
  } else {
    typingDiv.innerHTML += ` <span>${e.innerHTML}</span> `;
    // operators.push(e.target.innerHTML);
  }
};
