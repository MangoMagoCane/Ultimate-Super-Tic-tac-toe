import { createBoardDOM } from "./board";
import { appElement } from "./main";
import {
  Board,
  GameMove,
  GameState,
  GridCoord,
  GridState,
  TTTBoard,
  USTBoard,
  UTTBoard,
} from "./types";

export let globalGameState: GameState = createGameState();
console.log(globalGameState);

export function buttonClick(
  ustCoord: GridCoord,
  uttCoord: GridCoord,
  tttCoord: GridCoord,
): void {
  const result = playRound(globalGameState, {
    ustMove: ustCoord,
    uttMove: uttCoord,
    tttMove: tttCoord,
  });

  if (result !== undefined) {
    globalGameState = result;
    createBoardDOM(appElement, globalGameState);
  }
}

export function playRound(
  inputState: GameState,
  move: GameMove,
): GameState | undefined {
  const { inPlayUttBoard, inPlayTttBoard } = inputState;
  const { ustMove, uttMove, tttMove } = move;

  console.assert(
    !(inPlayUttBoard === undefined && inPlayTttBoard !== undefined),
    "inPlayUttBoard must not be undefined if inPlayTttBoard isn't undefined",
  );

  const outputState: GameState = window.structuredClone(inputState);
  outputState.player = inputState.player === "X" ? "O" : "X";

  const validUttMove: boolean =
    inPlayUttBoard === undefined ||
    (inPlayUttBoard.y === ustMove.y && inPlayUttBoard.x === ustMove.x);
  const validTttMove: boolean =
    inPlayTttBoard === undefined ||
    (inPlayTttBoard.y === uttMove.y && inPlayTttBoard.x === uttMove.x);

  const ustBoard: USTBoard = outputState.board;
  const uttBoard: UTTBoard = outputState.board.grid[ustMove.y][ustMove.x];
  const tttBoard: TTTBoard = uttBoard.grid[uttMove.y][uttMove.x];
  const tttSquare: GridState = tttBoard.grid[tttMove.y][tttMove.x].state;

  // Registers move if valid.
  if (
    uttBoard.state === "" &&
    tttBoard.state === "" &&
    tttSquare === "" &&
    validUttMove &&
    validTttMove
  ) {
    tttBoard.grid[tttMove.y][tttMove.x].state = inputState.player;
    console.log("valid move");
  } else {
    console.log("ERROR: Invalid move 2.");
    return undefined;
  }

  updateBoard(tttBoard);
  updateBoard(uttBoard);
  updateBoard(ustBoard);

  console.log("bar", uttBoard);
  if (tttBoard.state !== "") {
    console.log("foo", uttBoard.state);
    outputState.inPlayUttBoard =
      ustBoard.grid[uttMove.y][uttMove.x].state !== ""
        ? undefined
        : { y: uttMove.y, x: uttMove.x };
    outputState.inPlayTttBoard = undefined;
    return outputState;
  }

  outputState.inPlayUttBoard = { y: ustMove.y, x: ustMove.x };

  if (uttBoard.grid[tttMove.y][tttMove.x].state === "") {
    outputState.inPlayTttBoard = { y: tttMove.y, x: tttMove.x };
  } else {
    outputState.inPlayTttBoard = undefined;
  }
  return outputState;
}

function updateBoard(board: Board): void {
  for (const player of ["X", "O"] as GridState[]) {
    for (let i = 0; i < 3; i++) {
      let threeHorizontal: boolean = true;
      let threeVertical: boolean = true;

      for (let j = 0; j < 3; j++) {
        if (board.grid[i][j].state !== player) {
          threeHorizontal = false;
        }
        if (board.grid[j][i].state !== player) {
          threeVertical = false;
        }
      }

      if (threeHorizontal || threeVertical) {
        board.state = player;
        return;
      }
    }

    let threeDiagonal = true;
    for (let i = 0; i < 3; i++) {
      if (board.grid[i][i].state !== player) {
        threeDiagonal = false;
        break;
      }
    }
    if (threeDiagonal) {
      board.state = player;
      return;
    }

    threeDiagonal = true;
    for (let i = 0; i < 3; i++) {
      if (board.grid[i][2 - i].state !== player) {
        threeDiagonal = false;
        break;
      }
    }
    if (threeDiagonal) {
      board.state = player;
      return;
    }
  }
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
        tttBoard.grid[Math.floor(k / 3)][k % 3] = { state: "" };
      }

      uttBoard.grid[Math.floor(j / 3)][j % 3] = tttBoard;
    }

    ustBoard.grid[Math.floor(i / 3)][i % 3] = uttBoard;
  }

  return gameState;
}
