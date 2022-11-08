const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  if (resultEl.innerText == "") {
    return alert("Please generate the password.");
  }
  navigator.clipboard.writeText(resultEl.innerText);
  alert("Password copied to the clipboard");
});

generateEl.addEventListener("click", () => {
  const leng = lengthEl.value;
  const uc = uppercaseEl.checked;
  const lc = lowercaseEl.checked;
  const nu = numbersEl.checked;
  const sy = symbolsEl.checked;
  resultEl.innerText = generatePassword(lc, uc, nu, sy, leng);
});

function generatePassword(lower, upper, number, symbol, length) {
  if (length > 100) {
    return alert(
      "Length should be less than 100, Please change the length and try again."
    );
  }
  let pass = "";
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => {
      return Object.values(item)[0];
    }
  );

  if (typesArr.length == 0) {
    return alert("Select atleast one check box below!");
  }

  for (let i = 0; i < length; i++) {
    typesArr.forEach((cc) => {
      let name = Object.keys(cc)[0];
      pass = pass + randomFunc[name]();
    });
  }
  return pass.slice(0, length);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const sym = "!@#$%^&*(){}[]|<>?/';:~";
  return sym[Math.floor(Math.random() * sym.length)];
}
