// Get the computer's selection
function getComputerChoice() {
    let choiceNumber = Math.floor(Math.random() * 3);

    switch(choiceNumber) {
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
        default:
            break;
    }
}

// Get the player's choice
function getHumanChoice() {
    let choice = prompt("Please enter rock, paper or scissors");
    return choice;
}

let humanScore = 0;
let computerScore = 0;

// Play a single round
function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (humanChoice === "rock") {
        if (computerChoice === "paper") {
            computerScore++;
            console.log("You lose!  Paper beats Rock");
        }
        else if (computerChoice === "scissors") {
            console.log("You win!  Rock beats Scissors!");
            humanScore++;
        }
        else {
            humanScore + .5;
            computerScore + .5;
            console.log("It's a tie!")
        }
    }

    if (humanChoice === "paper") {
        if (computerChoice === "scissors") {
            computerScore++;
            console.log("You lose!  Scissors beats Paper");
        }
        else if (computerChoice === "rock") {
            console.log("You win!  Paper beats Rock!");
            humanScore++;
        }
        else {
            humanScore + .5;
            computerScore + .5;
            console.log("It's a tie!")
        }
    }

    if (humanChoice === "scissors") {
        if (computerChoice === "rock") {
            computerScore++;
            console.log("You lose!  Rock beats Scissors");
        }
        else if (computerChoice === "paper") {
            console.log("You win!  Scissors beats Paper!");
            humanScore++;
        }
        else {
            humanScore + .5;
            computerScore + .5;
            console.log("It's a tie!")
        }
    }
}






// Play the game 5 times
function playGame() {
    let numberOfGames = 5;

    while (numberOfGames > 0) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        console.log("Computer chooses: " + computerSelection)
        playRound(humanSelection, computerSelection);
        console.log("Human: " + humanScore + ", Computer: " + computerScore);
        numberOfGames--;
    }
}

playGame();