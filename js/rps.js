//set winning logic

let options = ['Rock', 'Paper', 'Scissors']
let playerChoice;
let aiChoice;

let wins = 0;
let losses = 0;
let gameStatus = "tie";


//function to let AI select

function aiThrows(){
    aiChoice = options[Math.floor(Math.random()*options.length)];
    console.log(aiChoice);
}




function playersThrow(option){
    playerChoice = option;
    console.log('we threw ' + option)
    aiThrows();
    whoWon();

}
function whoWon() {
    if (playerChoice === aiChoice) {
        gameStatus = "It's a Draw";
    } else if (
        (playerChoice === "Rock" && aiChoice === "Scissors") ||
        (playerChoice === "Paper" && aiChoice === "Rock") ||
        (playerChoice === "Scissors" && aiChoice === "Paper")
    ) {
        gameStatus = "Player Wins";
        wins++;
    } else {
        gameStatus = "Player Loses";
        losses++;
    }


    //logic to update front end
    document.getElementById('playerThrowsIcon').innerHTML = 'The Player Threw ' + playerChoice;
    document.getElementById('aiThrowsIcon').innerHTML = 'The AI Threw ' + aiChoice;

    document.getElementById('gameStatus').innerHTML = gameStatus;


    document.getElementById('totalWins').innerHTML = wins;
    document.getElementById('totalLosses').innerHTML = losses;
}

