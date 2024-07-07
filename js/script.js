const introScreenDiv = document.getElementById("intro-screen");
const gameScreenDiv = document.getElementById("game-screen");
const gameContainerDiv = document.getElementById("game-container");
const winnerTitle = document.getElementById('winnerTitle');
const endScreenDiv = document.getElementById('end-screen');
const gameTiles = Array.from(gameScreenDiv.children);
var currentPlayerElement = document.getElementById("currentPlayer");
let turn = 0;
// console.log(gameTiles)

function playerTurn(turn) {
  return turn % 2 === 0 ? "X" : "O";
}

function updateCurrentPlayer() {
  currentPlayerElement.innerText = "Player: " + playerTurn(turn);
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameTiles[a].innerHTML &&
      gameTiles[a].innerHTML === gameTiles[b].innerHTML &&
      gameTiles[a].innerHTML === gameTiles[c].innerHTML
    )
      return gameTiles[a].innerHTML;
  }
  return null;
}

function drawInTiles() {
  gameTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      if (tile.innerText.length === 0) {
        const playerSymbol = playerTurn(turn);
        tile.innerText = playerSymbol;
        if (checkWin() !== null) {
          winnerTitle.innerHTML = "Player "+playerSymbol+" has won!";
          endScreenDiv.style.display = 'block';
          endScreenDiv.classList.add('animationEntrance');
        } else {
          turn++;
          updateCurrentPlayer();
        }
      }
    });
  });
}

function gameStart() {
  introScreenDiv.style.display = "none";
  gameContainerDiv.style.display = "block";
  drawInTiles();
  updateCurrentPlayer();
}

function newGame(){
  location.reload();
}