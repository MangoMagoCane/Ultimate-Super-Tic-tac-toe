import {
  GameMove,
  GameState,
  GridCoord,
  GridState,
  TTTBoard,
  USTBoard,
  UTTBoard,
} from "./types";

let globalGameState: GameState = createGameState();
console.log(globalGameState);

export function buttonClick(
  element: HTMLElement,
  ustCoord: GridCoord,
  uttCoord?: GridCoord,
  tttCoord?: GridCoord,
): void {
  console.log(element.id.split("-"));
  console.log(ustCoord, uttCoord, tttCoord);
  console.log(globalGameState.player);

  if (element.innerText === "") {
    element.innerText = globalGameState.player;
    globalGameState.player = globalGameState.player === "X" ? "O" : "X";
  }
}

export function playRound(inputState: GameState, move: GameMove): GameState {
  const { inPlayUttBoard, inPlayTttBoard } = inputState;
  const { ustMove, uttMove, tttMove } = move;

  const outputState: GameState = window.structuredClone(inputState);
  outputState.player = inputState.player === "X" ? "O" : "X";

  const uttBoard: UTTBoard = outputState.board.grid[ustMove.y][ustMove.x];
  const validUttMove: boolean =
    !!inPlayUttBoard &&
    inPlayUttBoard.y === ustMove.y &&
    inPlayUttBoard.x === ustMove.x;

  const tttBoard: TTTBoard = uttBoard.grid[uttMove.y][uttMove.x];

  const tttSquareState: GridState = tttBoard.grid[tttMove.y][tttMove.x];

  if (inPlayUttBoard && inPlayTttBoard) {
    if (!uttBoard.state && !tttBoard.state && !tttSquareState) {
      tttBoard.grid[tttMove.y][tttMove.x] = inputState.player;
    } else {
      // ERROR
    }
  }

  return outputState;
}

export function createGameState(): GameState {
  const ustBoard: USTBoard = {
    state: "",
    grid: new Array(3),
  };

  const gameState: GameState = {
    player: "X",
    inPlayUttBoard: undefined,
    inPlayTttBoard: undefined,
    board: ustBoard,
  };

  for (let i = 0; i < 9; i++) {
    if (i < 3) ustBoard.grid[i % 3] = new Array(3);
    const uttBoard: UTTBoard = {
      state: "",
      grid: new Array(3),
    };

    for (let j = 0; j < 9; j++) {
      if (j < 3) uttBoard.grid[j % 3] = new Array(3);
      const tttBoard: TTTBoard = {
        state: "",
        grid: new Array(3),
      };

      for (let k = 0; k < 9; k++) {
        if (k < 3) tttBoard.grid[k % 3] = new Array(3);
        tttBoard.grid[Math.floor(k / 3)][k % 3] = "";
      }

      uttBoard.grid[Math.floor(j / 3)][j % 3] = tttBoard;
    }

    ustBoard.grid[Math.floor(i / 3)][i % 3] = uttBoard;
  }

  return gameState;
}
