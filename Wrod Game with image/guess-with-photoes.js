// Getting Game Name

let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
    "footer"
).innerText = `${gameName} Game Created by Loai Alshujaa`;

// Setting Game options
let numberOfTries = 2;
let currentTry = 1;
let numberOfHints = 2;

// Mange Words
let wordGuess = "";
let words = ['bear','bird','cat','chicken','dog'
,'fish','fox','horse','lion','monkey','penguin','tiger'];

wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let image = document.querySelector('.image img');
image.setAttribute('src' , `./img/${wordGuess}.jpg`)

let numberOfLetters = wordGuess.length;

let messageArea = document.querySelector(".message");

//Mange Hints 
document.querySelector('.hint span').innerHTML = numberOfHints;
const hintButton = document.querySelector('.hint');

hintButton.addEventListener('click', getHint)


//Function generaInput
function generaInput() {
    const inputContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span> Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disable");

        // Create Inputs
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.append(input);
        }

        inputContainer.append(tryDiv);
    }

    // focus on first input in first try
    inputContainer.children[0].children[1].focus();

    //Disable All inputs except first one
    const inputsInDisableDiv = document.querySelectorAll(".disable input");
    inputsInDisableDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        //Convert Input to UpperCase
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });

        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            } else if (event.key === "ArrowLeft") {
                const previousInput = currentIndex - 1;
                if (previousInput >= 0) inputs[previousInput].focus();
            }
        });
    });
}
//
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

console.log(wordGuess);
function handleGuesses() {
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(
            `#guess-${currentTry}-letter-${i}`
        );
        const letter = inputField.value.toLowerCase();
        let actualLetter = wordGuess[i - 1];

        if (letter === actualLetter) {
            inputField.classList.add("in-place");
        } else if (wordGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    //Check if user win or lose

    if (successGuess) {
        messageArea.innerHTML = `You Win The word is <span>${wordGuess}</span>`;
        if (numberOfHints === 2){
            messageArea.innerHTML = `You Win The word is <span>${wordGuess}</span><p>Well done, You did not use hints</p>`
        }

        // Add disable class to all divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((div) => div.classList.add("disable"));

        // Add disable to check button
        guessButton.disabled = true;
        hintButton.disabled = true;
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disable");
        const currentTryInputs = document.querySelectorAll(
            `.try-${currentTry} input`
        );
        currentTryInputs.forEach((ele) => (ele.disabled = true));
        currentTry++;

        const nextInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextInputs.forEach((ele) => (ele.disabled = false));

        let ele = document.querySelector(`.try-${currentTry}`)
        if (ele) {
            document.querySelector(`.try-${currentTry}`).classList.remove('disable');
            ele.children[1].focus()
        } else {
            guessButton.disabled = true;
            hintButton.disabled = true
            messageArea.innerHTML = `You Lose The Word is <span>${wordGuess}</span>`
        }

        // handleGuesses()
    }
}


function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector('.hint span').innerHTML = numberOfHints;

    }
    if(numberOfHints === 0){
        hintButton.disabled = true;

    }
    const enableInputs = document.querySelectorAll('input:not([disabled])');
    const emptyEnableInputs = Array.from(enableInputs).filter((input) => input.value === '')
    

    if (emptyEnableInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length);
        const randomInput = emptyEnableInputs[randomIndex];
        const indexToFill = Array.from(enableInputs).indexOf(randomInput);
        const randomLetter = wordGuess[indexToFill];

        if(indexToFill !== -1){
            randomInput.value = randomLetter.toUpperCase();
        }
    }

}

function handleBackSpace(event){
    if(event.key === 'Backspace'){
        const inputs = document.querySelectorAll(`input:not([disabled])`)
        const currentIndex = Array.from(inputs).indexOf(document.activeElement)
        if (currentIndex > 0){
            const currentInput = inputs[currentIndex]
            const prevInput = inputs[currentIndex - 1]
            currentInput.value = ''
            inputs[currentIndex - 1].focus()
            prevInput.value = ''
        }
    }
}



document.addEventListener('keydown',handleBackSpace)

window.onload = function () {
    generaInput();
};
