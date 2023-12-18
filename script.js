const Gameboard = (() => {
  let gameOver = false;

  let currentBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getCurrentBoard = () => {
    return currentBoard;
  };

  const makeMove = () => {
    if (Players.playerOne.playersTurn === true) {
      let row = window.prompt("Pick a row: ");
      let column = window.prompt("Pick a column: ");
      getCurrentBoard()[row][column] = Players.playerOne.symbol;
    }
  };

  const resetGame = () => {
    currentBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  return {
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

  return {
    playerOne,
    playerTwo,
  };
})();
