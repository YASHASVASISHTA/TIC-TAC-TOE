document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const cells = document.querySelectorAll(".cell");
    const resetBtn = document.getElementById("reset-btn");
    const statusMsg = document.getElementById("status-msg");

    let currentPlayer = "X";
    let isGameFinished = false;

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
                isGameFinished = true;
                return cells[a].innerText;
            }
        }

        if (Array.from(cells).every((cell) => cell.innerText)) {
            isGameFinished = true;
            return "draw";
        }

        return null;
    }

    function findEmptyCells() {
        return Array.from(cells).filter((cell) => !cell.innerText);
    }

    function minimax(depth, isMaximizing) {
        const scores = {
            X: -1,
            O: 1,
            draw: 0,
        };

        const winner = checkWinner();
        if (winner) {
            return scores[winner];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (const cell of findEmptyCells()) {
                cell.innerText = "O";
                const score = minimax(depth + 1, false);
                cell.innerText = "";
                bestScore = Math.max(bestScore, score);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (const cell of findEmptyCells()) {
                cell.innerText = "X";
                const score = minimax(depth + 1, true);
                cell.innerText = "";
                bestScore = Math.min(bestScore, score);
            }
            return bestScore;
        }
    }

    function makeComputerMove() {
        const emptyCells = findEmptyCells();
        if (emptyCells.length === 0 || isGameFinished) {
            return;
        }

        let bestScore = -Infinity;
        let bestMove;
        for (const cell of emptyCells) {
            cell.innerText = "O";
            const score = minimax(0, false);
            cell.innerText = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }

        bestMove.innerText = "O";
        currentPlayer = "X";
        checkWinner();
    }

    function handleCellClick(cell) {
        if (!cell.innerText && !isGameFinished && currentPlayer === "X") {
            cell.innerText = currentPlayer;
            const winner = checkWinner();
            if (winner) {
                if (winner === "draw") {
                    statusMsg.innerText = "It's a draw!";
                } else {
                    statusMsg.innerText = `${winner} won!`;
                }
                statusMsg.style.display = "block";
                isGameFinished = true;
            } else {
                currentPlayer = "O";
                setTimeout(makeComputerMove, 500);
            }
        }
    }

    function handleReset() {
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.classList.remove("win");
        });

        currentPlayer = "X";
        isGameFinished = false;
        statusMsg.style.display = "none";
    }

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    resetBtn.addEventListener("click", handleReset);
});
