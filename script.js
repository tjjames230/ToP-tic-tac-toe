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
    });
    boardUI.playerTurn.innerText = "Player 1";
  };

  return {
    getCurrentBoard,
    makeMove,
    resetRound,
    resetGame,
  };
})();

const boardUI = (() => {
  const tiles = document.querySelectorAll(".tile");
  const resetRoundBtn = document.querySelector("#reset-round-btn");
  const resetGameBtn = document.querySelector("#reset-game-btn");
  const playerTurn = document.querySelector("#player-turn-text");
  const playerOneScore = document.querySelector("#player-one-score");
  const playerTwoScore = document.querySelector("#player-two-score");

  tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      if (e.target.innerText === "") {
        const num = e.target.dataset.id;
        e.target.innerText = Players.getPlayer().symbol;
        e.target.classList.add(Players.getPlayer().color);
        Gameboard.makeMove(Players.getPlayer(), num);
        playerOneScore.innerText = Players.playerOne.score;
        playerTwoScore.innerText = Players.playerTwo.score;
        playerTurn.innerText = Players.getPlayer().name;
      }
    });
  });

  resetRoundBtn.addEventListener("click", Gameboard.resetRound);
  resetGameBtn.addEventListener("click", () => {
    Gameboard.resetGame();
    playerOneScore.innerText = Players.playerOne.score;
    playerTwoScore.innerText = Players.playerTwo.score;
  });

  return {
    tiles,
    playerTurn,
  };
})();

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

    for (let i = 0; i < winningBoard.length; i++) {
      const winCondition = winningBoard[i];
      let hasWon = checker(checkedBoxes, winCondition);

      if (hasWon) {
        player.score++;
        return true;
      }
    }

    return false;
  };

  return {
    checkGameOver,
    checkWinner,
  };
})();

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
