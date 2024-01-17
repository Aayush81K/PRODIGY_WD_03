const board = document.getElementById('game-board');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Event listener for the game board
board.addEventListener('click', handleCellClick);

// Function to handle cell clicks
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (isBoardFull()) {
            resultDisplay.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinnerCells(combination);
            return true;
        }
    }

    return false;
}

// Function to highlight winner cells
function highlightWinnerCells(combination) {
    for (const index of combination) {
        document.querySelector(`[data-index='${index}']`).style.backgroundColor = '#4caf50';
    }
}

// Function to check if the board is full
function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    resultDisplay.textContent = '';
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }
}

// Initialize the game board
resetGame();
