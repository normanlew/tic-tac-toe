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
