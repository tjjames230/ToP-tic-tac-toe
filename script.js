const Gameboard = (() => {
  let gameOver = false;

  const checkGameOver = () => {};

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
  };

  return {
    checkGameOver,
    getCurrentBoard,
    makeMove,
    resetGame,
  };
})();

const Players = (() => {
  // object containing both players, human or AI etc, X or O, turn, etc.
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

  return {
    playerOne,
    playerTwo,
    checkPlayerTurn,
  };
})();
