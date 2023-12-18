const Gameboard = (() => {
  let currentBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
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
  };
})();

const GameController = (() => {
  let gameOver = false;

  const checkGameOver = () => {
    return gameOver;
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
