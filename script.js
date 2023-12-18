const Gameboard = (() => {
  let currentBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function getCurrentBoard() {
    return currentBoard;
  }

  function makeMove() {}

  function resetGame() {
    currentBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  return {
    getCurrentBoard,
    makeMove,
    resetGame,
  };
})();

const Players = (() => {
  // object containing both players, human or AI etc, X or O, turn, etc.
  function createPlayers(player, symbol, type, turn) {
    return {
      name: player,
      symbol: symbol,
      score: 0,
      type: type,
      checkedBoxes: [],
      playersTurn: turn,
    };
  }

  const playerOne = createPlayers("p1", "X", "human", true);
  const playerTwo = createPlayers("p2", "O", "ai", false);

  function getPlayerTurn() {
    return Players.playerOne.playersTurn;
  }

  return {
    playerOne,
    playerTwo,
    getPlayerTurn,
  };
})();
