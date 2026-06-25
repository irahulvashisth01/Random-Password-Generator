const password = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const message = document.getElementById("message");

lengthSlider.addEventListener("input", () => {
    lengthValue.innerText = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbers.checked){
        chars += "0123456789";
    }

    if(symbols.checked){
        chars += "!@#$%^&*()_+{}[]<>?";
    }

    let pass = "";

    for(let i = 0; i < lengthSlider.value; i++){
        pass += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    password.value = pass;
}

copyBtn.addEventListener("click", () => {

    if(password.value === ""){
        return;
    }

    navigator.clipboard.writeText(password.value);

    message.innerText = "✅ Password Copied!";

    setTimeout(() => {
        message.innerText = "";
    }, 2000);
});