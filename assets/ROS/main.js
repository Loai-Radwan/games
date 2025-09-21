

let user = document.querySelector('.user img')
let computer = document.querySelector('.computer img')

let userChoices = document.querySelectorAll('.choice .box')
let userChoice
const choices = ['rock', 'paper', 'scissor']

let computerChoice = choices[Math.floor(Math.random() * 3)]

console.log(computerChoice)

let result = document.querySelector('.result')
let choice = document.querySelector('.choice')
let resultHeading = document.querySelector('.result h1')

userChoices.forEach(box => {
    console.log(box)
    box.addEventListener('click', e => {

        userChoice = e.target.dataset.rps
        console.log(userChoice)
        choice.classList.add('hide')
        result.classList.add('show')
        user.setAttribute('src', `img/${userChoice}.png`)
        user.setAttribute('alt', userChoice)
        computer.setAttribute('alt', computerChoice)
        computer.setAttribute('src', `img/${computerChoice}.png`)
        winner = getWinner(userChoice, computerChoice)
        if (winner == 'user') {
            resultHeading.textContent = 'You Won'
        }
        else if (winner == 'computer') {
            resultHeading.textContent = 'You Lost'
        } else {
            resultHeading.textContent = 'Draw'
        }

    })
})

function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return "draw"

    if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        return "user"
    }

    return "computer"
}
