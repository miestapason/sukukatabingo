const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const bingoBoard = document.getElementById("bingo-board");
  const headerCells = document.querySelectorAll(".header-cell");
  const size = 5;
  let board = [];

  const sukuKataList = [
    "sut", "ran", "pan", "hit", "cap", "dak", "lan", "wan", "dan", "rak",
    "mut", "sat", "kul", "pas", "tam", "til", "tak", "put", "kan", "jah",
    "kus", "gak", "kat", "kok", "bun"
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Shuffle the list to ensure randomness
  shuffleArray(sukuKataList);

  // Generate Bingo board
  let syllableIndex = 0;
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = sukuKataList[syllableIndex++];
      cell.addEventListener("click", () => handleCellClick(cell));
      bingoBoard.appendChild(cell);
      board[i][j] = cell;
    }
  }

  function handleCellClick(cell) {
    cell.classList.add("clicked");
    checkBingo();
  }

  function checkBingo() {
    let rowCounts = Array(size).fill(0);
    let colCounts = Array(size).fill(0);
    let diag1Count = 0;
    let diag2Count = 0;
    let headerUpdateCount = 0;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j].classList.contains("clicked")) {
          rowCounts[i]++;
          colCounts[j]++;
          if (i === j) diag1Count++;
          if (i + j === size - 1) diag2Count++;
        }
      }
    }

    // Update header cells
    const headerStates = [rowCounts, colCounts, [diag1Count, diag2Count]];
    headerStates.forEach((counts, index) => {
      counts.forEach(count => {
        if (count === size) {
          headerCells[headerUpdateCount].classList.add("circle");
          headerUpdateCount++;
        }
      });
    });
  }
});
