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
      updateBoard(player);
      Players.updateTurn(player);
    }
  };

  const updateBoard = (player) => {
    let row = window.prompt("Pick a row: ");
    let column = window.prompt("Pick a column: ");

    if (typeof getCurrentBoard()[row][column] === "number") {
      player.checkedBoxes.push(currentBoard[row][column]);
      getCurrentBoard()[row][column] = player.symbol;
    } else {
      console.log("That spot has been taken, please use a new number");
    }
  };

  const resetGame = () => {
    currentBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    Players.playerOne.playersTurn = true;
    Players.playerTwo.playersTurn = false;
  };

  return {
    getCurrentBoard,
    makeMove,
    resetGame,
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
    checkWinner();
    return gameOver;
  };

  const checkWinner = (board, player) => {
    let updatedBoard = board.sort();

    if (updatedBoard) {
      /*  */
    }
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

  const playerOne = createPlayers("p1", "X", "human", true);
  const playerTwo = createPlayers("p2", "O", "ai", false);

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
    checkPlayerTurn,
    updateTurn,
  };
})();
