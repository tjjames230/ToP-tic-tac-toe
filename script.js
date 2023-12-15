const StartScreen = (() => {
  // select one or two players
})();

const Gameboard = (() => {
  function createGameBoard() {
    return [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  function getCurrentBoard() {
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  return {
    createGameBoard,
    getCurrentBoard,
  };
})();

const Players = (() => {
  // object containing both players, human or AI etc, X or O, turn, etc.
  function createPlayers(player, symbol, turn) {
    return {
      name: player,
      symbol: symbol,
      score: 0,
      type: "human",
      checkedBoxes: [],
      playersTurn: turn,
    };
  }

  return {
    playerOne: createPlayers("p1", "X", true),
    playerTwo: createPlayers("p2", "O", false),
  };
})();
