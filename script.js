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

    function handleCellClick(cell) {
        if (!cell.innerText && !isGameFinished) {
            cell.innerText = currentPlayer;
            const winner = checkWinner();
            if (winner) {
                if (winner === "draw") {
                    statusMsg.innerText = "It's a draw!";
                } else {
                    statusMsg.innerText = `${winner} won!`;
                }
                statusMsg.style.display = "block";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
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
