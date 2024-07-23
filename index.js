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
    let aiMove = null;

    // 1. Winning Move
    aiMove = findWinningMove('O');
    if (aiMove !== null) return aiMove;

    // 2. Blocking Move
    aiMove = findWinningMove('X');
    if (aiMove !== null) return aiMove;

    // 3. Fork Move
    aiMove = findForkMove('O');
    if (aiMove !== null) return aiMove;

    // 4. Blocking Fork
    aiMove = findForkMove('X');
    if (aiMove !== null) return aiMove;

    // 5. Center Move
    if (isSquareEmpty(5)) return 5;

    // 6. Opposite Corner
    aiMove = findOppositeCorner();
    if (aiMove !== null) return aiMove;

    // 7. Empty Corner
    aiMove = findEmptyCorner();
    if (aiMove !== null) return aiMove;

    // 8. Empty Side
    aiMove = findEmptySide();
    if (aiMove !== null) return aiMove;

    // Fallback to random move if no strategic move found
    let randomIndex = Math.floor(Math.random() * availableSquares.length);
    return availableSquares[randomIndex];
}

function findWinningMove(player) {
    for (const combo of winningCombos) {
        let count = 0;
        let emptySquare = null;
        combo.forEach((index) => {
            const square = document.getElementById(index).innerHTML;
            if (square === player) count++;
            if (square === '') emptySquare = index;
        });
        if (count === 2 && emptySquare !== null) return emptySquare;
    }
    return null;
}

function findForkMove(player) {
    let possibleMoves = [];
    availableSquares.forEach((index) => {
        document.getElementById(index).innerHTML = player;
        if (findWinningMove(player) !== null) possibleMoves.push(index);
        document.getElementById(index).innerHTML = '';
    });
    if (possibleMoves.length > 1) return possibleMoves[0]; // Fork found
    return null;
}

function isSquareEmpty(index) {
    return document.getElementById(index).innerHTML === '';
}

function findOppositeCorner() {
    const corners = [[1, 9], [3, 7]];
    for (const [corner1, corner2] of corners) {
        if (document.getElementById(corner1).innerHTML === 'X' && isSquareEmpty(corner2)) return corner2;
        if (document.getElementById(corner2).innerHTML === 'X' && isSquareEmpty(corner1)) return corner1;
    }
    return null;
}

function findEmptyCorner() {
    const corners = [1, 3, 7, 9];
    for (const corner of corners) {
        if (isSquareEmpty(corner)) return corner;
    }
    return null;
}

function findEmptySide() {
    const sides = [2, 4, 6, 8];
    for (const side of sides) {
        if (isSquareEmpty(side)) return side;
    }
    return null;
}

function tileSelected(square) {
    let tileId = square.getAttribute("data-square-id");
    console.log("user clicked tile: " + tileId);

    if (square.innerHTML === '') {
        if (turnCounter % 2 === 0) {
            square.innerHTML = "X";
            document.getElementById('playersTurn').innerHTML = "O's turn";
            turnCounter++;
            checkWinner();

            // AI makes a move immediately after player
            if (turnCounter % 2 !== 0) {
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
