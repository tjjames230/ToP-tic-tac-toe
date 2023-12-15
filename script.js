const startScreen = (() => {
  // select one or two players
})();

const gameboard = (() => {
  // this will have everything related specifically with the gameboard
})();

const players = (() => {
  // object containing both players, human or AI etc, X or O, turn, etc.
  function createPlayers(player) {
    return {
      name: player,
    };
  }

  return {
    playerOne: createPlayers("p1"),
    playerTwo: createPlayers("p2"),
  };
})();
