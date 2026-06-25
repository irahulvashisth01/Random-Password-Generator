const password = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const message = document.getElementById("message");
const strengthText = document.getElementById("strengthText");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let digits = "0123456789";
    let special = "!@#$%^&*()_+{}[]<>?";

    let chars = lowercase + uppercase;

    if (numbers.checked) {
        chars += digits;
    }

    if (symbols.checked) {
        chars += special;
    }

    let pass = "";

    const randomArray = new Uint32Array(lengthSlider.value);
    crypto.getRandomValues(randomArray);

    for (let i = 0; i < lengthSlider.value; i++) {
        pass += chars[randomArray[i] % chars.length];
    }

    password.value = pass;

    updateStrength(pass);
}

function updateStrength(pass) {

    let score = 0;

    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[!@#$%^&*()_+{}[\]<>?]/.test(pass)) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak 🔴";
        strengthText.style.color = "#ef4444";
    }
    else if (score === 3) {
        strengthText.textContent = "Medium 🟡";
        strengthText.style.color = "#facc15";
    }
    else {
        strengthText.textContent = "Strong 🟢";
        strengthText.style.color = "#22c55e";
    }
}

copyBtn.addEventListener("click", async () => {

    if (!password.value) {
        message.innerText = "⚠ Generate a password first";
        return;
    }

    try {

        await navigator.clipboard.writeText(password.value);

        copyBtn.innerHTML = "✓";

        message.innerText = "✅ Password Copied Successfully!";

        setTimeout(() => {
            copyBtn.innerHTML =
                '<i class="fa-regular fa-copy"></i>';
        }, 1500);

    } catch {

        message.innerText = "❌ Copy Failed";
    }

    setTimeout(() => {
        message.innerText = "";
    }, 2000);
});

numbers.addEventListener("change", generatePassword);
symbols.addEventListener("change", generatePassword);

window.addEventListener("load", generatePassword);