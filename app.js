class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        this.initializeGame();
    }
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('currentPlayer');
        this.gameMessageElement = document.getElementById('gameMessage');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        this.resetBtn = document.getElementById('resetBtn');
        this.winOverlay = document.getElementById('winOverlay');
        this.winMessage = document.getElementById('winMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.bindEvents();
        this.updateDisplay();
    }
    bindEvents() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
    }
    handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        this.makeMove(index, cell);
    }
    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add('filled', this.currentPlayer.toLowerCase(), 'placed');
        setTimeout(() => {
            cell.classList.remove('placed');
        }, 300);
        if (this.checkWinner()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    checkWinner() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = combination;
                return true;
            }
            return false;
        });
    }
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.highlightWinningCells();
        this.updateScores();
        setTimeout(() => {
            this.showWinOverlay(`Player ${this.currentPlayer} Wins!`, `player-${this.currentPlayer.toLowerCase()}-wins`);
        }, 1000);
        this.gameMessageElement.textContent = `Player ${this.currentPlayer} wins!`;
    }
    handleDraw() {
        this.gameActive = false;
        setTimeout(() => {
            this.showWinOverlay("It's a Draw!", 'draw');
        }, 500);
        this.gameMessageElement.textContent = "It's a draw!";
    }
    highlightWinningCells() {
        this.winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        this.currentPlayerElement.className = `player-indicator player-${this.currentPlayer.toLowerCase()}`;
        if (this.gameActive) {
            this.gameMessageElement.textContent = `Player ${this.currentPlayer}'s turn`;
        }
    }
    updateScores() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    showWinOverlay(message, className) {
        this.winMessage.textContent = message;
        this.winMessage.className = `win-message ${className}`;
        this.winOverlay.classList.add('show');
    }
    hideWinOverlay() {
        this.winOverlay.classList.remove('show');
    }
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        this.updateDisplay();
        this.gameMessageElement.textContent = "Make your move!";
    }
    playAgain() {
        this.hideWinOverlay();
        this.resetGame();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('winOverlay');
        if (overlay.classList.contains('show')) {
            overlay.classList.remove('show');
        }
    }
});
window.addEventListener('load', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.style.animationDelay = `${index * 0.1}s`;
        cell.classList.add('fade-in');
    });
});
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);