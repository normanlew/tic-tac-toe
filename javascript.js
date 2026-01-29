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
