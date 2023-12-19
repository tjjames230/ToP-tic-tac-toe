const Gameboard = (() => {
  let currentBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const numericalBoard = [
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
    getCurrentBoard()[row][column] = player.symbol;
    Players.checkedBoxes.push(numericalBoard[row][column]);
  };

  const resetGame = () => {
    currentBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    Players.playerOne.playersTurn = true;
    Players.playerTwo.playersTurn = false;
  };

  return {
    getCurrentBoard,
    makeMove,
    resetGame,
    numericalBoard,
  };
})();

const GameController = (() => {
  let gameOver = false;

  const checkGameOver = () => {
    checkWinner();
    return gameOver;
  };

  const checkWinner = (board, player) => {
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

    if (/* checked boxes matches with any winning condition */) {
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
