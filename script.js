const Gameboard = (() => {
  let currentBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const getCurrentBoard = () => {
    return currentBoard;
  };

  const makeMove = (player) => {
    if (Players.checkPlayerTurn(player)) {
      /* if a valid spot is picked, it will update the player's turn */
      if (updateBoard(player)) {
        Players.updateTurn(player);
      }
      GameController.checkGameOver();
    }
  };

  const updateBoard = (player) => {
    let row = window.prompt("Pick a row: ");
    let column = window.prompt("Pick a column: ");

    if (typeof getCurrentBoard()[row][column] === "number") {
      player.checkedBoxes.push(currentBoard[row][column]);
      getCurrentBoard()[row][column] = player.symbol;
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
    currentBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    Players.playerOne.playersTurn = true;
    Players.playerTwo.playersTurn = false;
    boardUI.tiles.forEach((tile) => {
      tile.innerText = "";
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
      e.target.innerText = Players.getPlayer().symbol;
      Players.updateTurn(Players.getPlayer());
      playerTurn.innerText = Players.getPlayer().name;
    });
  });

  resetRoundBtn.addEventListener("click", Gameboard.resetRound);

  return {
    tiles,
    playerTurn,
  };
})();

const GameController = (() => {
  let gameOver = false;
  const winningBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkGameOver = () => {
    checkWinner(Players.playerOne) || checkWinner(Players.playerTwo);
    return gameOver;
  };

  const checkWinner = (player) => {
    let checkedBoxes = player.checkedBoxes;

    for (let i = 0; i < winningBoard.length; i++) {
      const winCondition = winningBoard[i];
      let hasWon = true;

      for (let j = 0; j < winCondition.length; j++) {
        if (!checkedBoxes.includes(winCondition[j])) {
          hasWon = false;
          break;
        }
      }

      if (hasWon) {
        gameOver = true;
        console.log(`${player.name} is the winner!`);
        return true;
      }
    }

    return false;
  };

  return {
    checkGameOver,
  };
})();

const Players = (() => {
  const createPlayers = (player, symbol, type, turn) => {
    return {
      name: player,
      symbol: symbol,
      score: 0,
      type: type,
      checkedBoxes: [],
      playersTurn: turn,
    };
  };

  const playerOne = createPlayers("Player 1", "X", "human", true);
  const playerTwo = createPlayers("Player 2", "O", "ai", false);

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
