function startTicTacToe() {
    window.location.href = "/tictactoe.html";
}

function goHome() {
    window.location.href = "/index.html";
}

let turnCounter = 0;
const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

document.addEventListener('DOMContentLoaded', (event) => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            tileSelected(square);
        });
    });
});

let availableSquares = [];
function findEmptyTiles() {
    availableSquares = []; // Reset the array each time
    const tempSquares = document.querySelectorAll('.square');
    tempSquares.forEach((availableNumbers) => {
        if (availableNumbers.innerText === '') {
            availableSquares.push(availableNumbers.getAttribute('data-square-id'));
        }
    });
    console.log("AI's next move can be " + availableSquares);
}

function aiSquareSelection() {
    findEmptyTiles();

    console.log(availableSquares);

    if (availableSquares.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableSquares.length);
        let numberSelection = availableSquares[randomIndex];

        console.log('Square selected was ' + numberSelection);
        return numberSelection;
    } else {
        console.log('No available squares left to select.');
        return null;
    }
}

function tileSelected(square) {
    let tileId = square.getAttribute("data-square-id");
    console.log("user clicked tile: " + tileId);

    if (square.innerHTML === '') {
        if (turnCounter % 2 === 0) {
            square.innerHTML = "X";
            document.getElementById('playersTurn').innerHTML = "O's turn";
        } else {
            // This block should no longer be needed since AI move will be triggered after player move
        }
        turnCounter++;
        checkWinner();

        if (turnCounter % 2 !== 0) {
            // AI makes a move immediately after player
            let aiMove = aiSquareSelection();
            if (aiMove !== null) {
                let aiSquare = document.querySelector(`[data-square-id='${aiMove}']`);
                if (aiSquare) {
                    aiSquare.innerHTML = "O";
                }
                turnCounter++;
                document.getElementById('playersTurn').innerHTML = "X's turn";
                checkWinner();
            }
        }
    }
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const tileA = document.getElementById(a).innerHTML;
        const tileB = document.getElementById(b).innerHTML;
        const tileC = document.getElementById(c).innerHTML;

        if (tileA !== '' && tileA === tileB && tileA === tileC) {
            alert(`${tileA} wins!`);
            resetBoard();
            return;
        }
    }

    if (turnCounter === 9) {
        alert("It's a draw!");
        resetBoard();
    }
}

function resetBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.innerHTML = '';
    });
    turnCounter = 0;
    document.getElementById('playersTurn').innerHTML = "X's turn";
}
