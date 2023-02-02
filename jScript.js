const winConditions = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = new Array(9).fill(null);
let currentPlayer = 'X';

const checkForWin = () => {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const handleClick = (event) => {
  const square = event.target;
  const index = parseInt(square.dataset.index);
  if (board[index] || checkForWin()) {
    return;
  }
  board[index] = currentPlayer;
  square.textContent = currentPlayer;
  const winner = checkForWin();
  if (winner) {
    const winSound = document.getElementById("win-sound");
    function winning() {
      winSound.currentTime = 0;
      winSound.play();
    }
    winning();
    document.getElementById("winnerText").innerHTML=("Player " + `${winner} wins!`);
    board = new Array(9).fill(null);
    currentPlayer = 'X';
    render();
  } else if (board.every(square => square)) {
    const drawSound = document.getElementById("drawSound");
    function draw() {
      drawSound.currentTime =0;
      drawSound.play();
    }
    draw();
    document.getElementById("winnerText").innerHTML=("Game draw")
    // alert('Draw!');
    board = new Array(9).fill(null);
    currentPlayer = 'O';
    // document.getElementById("winnerText").innerHTML="";
    render();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById("winnerText").innerHTML="";
  }
};

const render = () => {
  board.forEach((mark, index) => {
    squares[index].textContent = mark;
  });
};

const squares = document.querySelectorAll('.square');
squares.forEach((square, index) => {
  square.addEventListener('click', handleClick);
  square.dataset.index = index;
});

render();

const sound = document.getElementById("click-sound");
squares.forEach(square => {
  square.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
  });
});