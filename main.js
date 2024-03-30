const board = document.getElementById('board');
let currentPlayer = 'red';
let gameBoard = [
  [], [], [], [], [], [], []
];

function createCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.addEventListener('click', () => dropPiece(col));
  return cell;
}

function dropPiece(col) {
  const row = getAvailableRow(col);
  if (row !== -1) {
    gameBoard[col][row] = currentPlayer;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add(currentPlayer);
    if (checkWin(col, row)) {
      alert(`${currentPlayer} wins!`);
      resetGame();
      return;
    }
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
  }
}

function getAvailableRow(col) {
  for (let row = 5; row >= 0; row--) {
    if (!gameBoard[col][row]) {
      return row;
    }
  }
  return -1;
}

function checkWin(col, row) {
  // Check horizontal
  let count = 1;
  count += checkDirection(col, row, 1, 0); // Check right
  count += checkDirection(col, row, -1, 0); // Check left
  if (count >= 4) return true;

  // Check vertical
  count = 1;
  count += checkDirection(col, row, 0, 1); // Check down
  if (count >= 4) return true;

  // Check diagonal
  count = 1;
  count += checkDirection(col, row, 1, 1); // Check down-right
  count += checkDirection(col, row, -1, -1); // Check up-left
  if (count >= 4) return true;

  // Check reverse diagonal
  count = 1;
  count += checkDirection(col, row, 1, -1); // Check up-right
  count += checkDirection(col, row, -1, 1); // Check down-left
  if (count >= 4) return true;

  return false;
}

function checkDirection(col, row, colDir, rowDir) {
  let count = 0;
  let c = col + colDir;
  let r = row + rowDir;
  while (c >= 0 && c < 7 && r >= 0 && r < 6 && gameBoard[c][r] === currentPlayer) {
    count++;
    c += colDir;
    r += rowDir;
  }
  return count;
}

function resetGame() {
  gameBoard = [
    [], [], [], [], [], [], []
  ];
  currentPlayer = 'red';
  board.innerHTML = '';
  render();
}

function render() {
  for (let col = 0; col < 7; col++) {
    const column = document.createElement('div');
    for (let row = 0; row < 6; row++) {
      gameBoard[col][row] = null;
      column.appendChild(createCell(row, col));
    }
    board.appendChild(column);
  }
}

render();
