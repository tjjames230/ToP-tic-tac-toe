// this method controls the state of the board
const Gameboard = (() => {
  let currentBoard = ["", "", "", "", "", "", "", "", ""];

  const getCurrentBoard = () => {
    return currentBoard;
  };

  const makeMove = (player, num) => {
    if (Players.checkPlayerTurn(player)) {
      /* if a valid spot is picked, it will update the player's turn */
      if (updateBoardState(player, num)) {
        Players.updateTurn(player);
      }
      GameController.checkGameOver();
    }
  };

  const updateBoardState = (player, num) => {
    if (getCurrentBoard()[num] === "") {
      player.checkedBoxes.push(num);
      getCurrentBoard()[num] = player.symbol;
      return true;
    } else {
      console.log("That spot has been taken, please use a new number");
    }
  };

  const resetGame = () => {
    resetRound();
    Players.playerOne.score = 0;
    Players.playerTwo.score = 0;
  };

  const resetRound = () => {
    currentBoard = ["", "", "", "", "", "", "", "", ""];
    Players.playerOne.playersTurn = true;
    Players.playerTwo.playersTurn = false;
    Players.playerOne.checkedBoxes = [];
    Players.playerTwo.checkedBoxes = [];
    boardUI.tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("green", "blue");
      tile.addEventListener("click", boardUI.tileClickEvent);
    });
    boardUI.playerTurn.innerText = "Player 1";
    boardUI.winText.innerText = "";
  };

  return {
    getCurrentBoard,
    makeMove,
    resetRound,
    resetGame,
  };
})();

// this method handles the UI related updates to the board
const boardUI = (() => {
  const tiles = document.querySelectorAll(".tile");
  const resetRoundBtn = document.querySelector("#reset-round-btn");
  const resetGameBtn = document.querySelector("#reset-game-btn");
  const playerTurn = document.querySelector("#player-turn-text");
  const playerOneScore = document.querySelector("#player-one-score");
  const playerTwoScore = document.querySelector("#player-two-score");
  const winText = document.querySelector("#win-text");

  const tileClickEvent = (e) => {
    if (e.target.innerText === "") {
      const num = e.target.dataset.id;
      e.target.innerText = Players.getPlayer().symbol;
      e.target.classList.add(Players.getPlayer().color);
      Gameboard.makeMove(Players.getPlayer(), num);
      playerOneScore.innerText = Players.playerOne.score;
      playerTwoScore.innerText = Players.playerTwo.score;
      playerTurn.innerText = Players.getPlayer().name;
    }
  };

  const displayWinner = (player) => {
    winText.innerText = `${player.name} is the winner!`;
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", tileClickEvent);
  });

  resetRoundBtn.addEventListener("click", Gameboard.resetRound);
  resetGameBtn.addEventListener("click", () => {
    Gameboard.resetGame();
    playerOneScore.innerText = Players.playerOne.score;
    playerTwoScore.innerText = Players.playerTwo.score;
  });

  return {
    tiles,
    winText,
    tileClickEvent,
    playerTurn,
    displayWinner,
  };
})();

// this method checks if the game is still active, if there is a winner or draw etc.
const GameController = (() => {
  let gameOver = false;
  const winningBoard = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  const checkGameOver = () => {
    gameOver = checkWinner(Players.playerOne) || checkWinner(Players.playerTwo);
    return gameOver;
  };

  const checkWinner = (player) => {
    let checkedBoxes = player.checkedBoxes;
    const checker = (arr, target) => target.every((v) => arr.includes(v));
    const drawCondition = (arr) => arr.every((val) => val.length != 0);

    for (let i = 0; i < winningBoard.length; i++) {
      const winCondition = winningBoard[i];
      let hasWon = checker(checkedBoxes, winCondition);

      if (hasWon) {
        player.score++;
        boardUI.displayWinner(player);
        boardUI.tiles.forEach((tile) => {
          tile.removeEventListener("click", boardUI.tileClickEvent);
        });
        return true;
      }
    }

    if (drawCondition(Gameboard.getCurrentBoard())) {
      boardUI.tiles.forEach((tile) => {
        tile.removeEventListener("click", boardUI.tileClickEvent);
      });
      boardUI.winText.innerText = "This is a draw!";
      return true;
    }

    return false;
  };

  return {
    checkGameOver,
    gameOver,
  };
})();

// this method handles the state of the players
const Players = (() => {
  const createPlayers = (player, symbol, type, turn, color) => {
    return {
      name: player,
      symbol: symbol,
      score: 0,
      type: type,
      checkedBoxes: [],
      playersTurn: turn,
      color: color,
    };
  };

  const playerOne = createPlayers("Player 1", "X", "human", true, "green");
  const playerTwo = createPlayers("Player 2", "O", "ai", false, "blue");

  const getPlayer = () => {
    return playerOne.playersTurn === true ? playerOne : playerTwo;
  };

  const checkPlayerTurn = (player) => {
    return player.playersTurn;
  };

  const updateTurn = (player) => {
    if (player === playerOne) {
      Players.playerOne.playersTurn = false;
      Players.playerTwo.playersTurn = true;
    } else if (player === playerTwo) {
      Players.playerOne.playersTurn = true;
      Players.playerTwo.playersTurn = false;
    }
  };

  return {
    playerOne,
    playerTwo,
    getPlayer,
    checkPlayerTurn,
    updateTurn,
  };
})();
