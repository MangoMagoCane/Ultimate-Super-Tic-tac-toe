import { GridCoord, gridState, TTTBoard, USTBoard, UTTBoard } from "./types";

let player: gridState = "X";

export function buttonClick(
  element: HTMLElement,
  ustCoord: GridCoord,
  uttCoord?: GridCoord,
  tttCoord?: GridCoord,
): void {
  console.log(element.id.split("-"));
  console.log(ustCoord, uttCoord, tttCoord);
  console.log(player);

  if (element.innerText === "") {
    element.innerText = player;
    player = player === "X" ? "O" : "X";
  }
}

export function createGameState(): USTBoard {
  const ustBoard: USTBoard = {
    state: "",
    inPlayBoard: [undefined, undefined],
    grid: new Array(3),
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

  return ustBoard;
}
