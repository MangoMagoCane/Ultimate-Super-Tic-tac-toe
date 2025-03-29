import { buttonClick, copyMoves } from "./gameLogic";
import {
  GameState,
  GridCoord,
  GridState,
  TTTBoard,
  USTBoard,
  UTTBoard,
} from "./types";

export function createBoardDOM(
  element: HTMLDivElement,
  gameState: GameState,
): void {
  element.innerHTML = ``;
  createUstBoardDOM(element, gameState.board);
  if (gameState.inPlayUttBoard) {
    if (gameState.inPlayTttBoard) {
      const element: HTMLDivElement = document.querySelector(
        `#ttt-${gameState.inPlayUttBoard.y}_${gameState.inPlayUttBoard.x}-${gameState.inPlayTttBoard.y}_${gameState.inPlayTttBoard.x}`,
      )!;
      element.classList.add("in-play-board");
    } else {
      const element: HTMLDivElement = document.querySelector(
        `#utt-${gameState.inPlayUttBoard.y}_${gameState.inPlayUttBoard.x}`,
      )!;
      element.classList.add("in-play-board");
    }
  } else {
    const element: HTMLDivElement = document.querySelector("#ust")!;
    element.classList.add("in-play-board");
  }
  const movesButton: HTMLButtonElement = document.createElement("button");
  movesButton.innerText = "copy moves to clipboard";
  movesButton.onclick = copyMoves;
  element.append(movesButton);
}

export function createUstBoardDOM(
  element: HTMLDivElement,
  ustBoard: USTBoard,
): void {
  const container: HTMLDivElement = document.createElement("div");
  container.id = "ust";
  container.className = "ust-container";
  const overlay: HTMLDivElement = document.createElement("div");
  overlay.id = "ust-overlay";
  overlay.className = "ttt-overlay";
  overlay.innerText = ustBoard.state;

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createUttBoardDOM(
        { y: i, x: j },
        ustBoard.grid[i][j],
      );
      grid.id = `utt-${i}_${j}`;
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  element.appendChild(container);
  container.appendChild(overlay);
  positionOverlays(0);
}

function createUttBoardDOM(
  ustCoord: GridCoord,
  uttBoard: UTTBoard,
): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "utt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.id = gridId(ustCoord);
  overlay.className = "ttt-overlay";
  overlay.innerText = uttBoard.state;

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createTttBoardDOM(
        ustCoord,
        { y: i, x: j },
        uttBoard.grid[i][j],
      );
      grid.id = `ttt-${ustCoord.y}_${ustCoord.x}-${i}_${j}`;
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

function createTttBoardDOM(
  ustCoord: GridCoord,
  uttCoord: GridCoord,
  tttBoard: TTTBoard,
): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ttt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.id = gridId(ustCoord, uttCoord);
  overlay.className = "ttt-overlay";
  overlay.innerText = tttBoard.state;

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const tttCoord: GridCoord = { y: i, x: j };
      const button: HTMLButtonElement = document.createElement("button");
      button.id = gridId(ustCoord, uttCoord, tttCoord);
      // if (Math.random() > 0.7) {
      //   button.innerText = Math.random() > 0.5 ? "X" : "O";
      // }
      const tttState: GridState = (button.innerText =
        tttBoard.grid[i][j].state);
      button.innerText = tttState;
      button.style.color = `var(--gruvbox-${tttState === "X" ? "red" : "blue"}-color)`;
      button.onclick = (): void => buttonClick(ustCoord, uttCoord, tttCoord);
      row.appendChild(button);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

export function positionOverlays(colorSetIndex: number): void {
  const colorSets = [
    ["red", "blue"],
    ["orange", "green"],
    ["yellow", "teal"],
  ];

  const overlays = document.querySelectorAll<HTMLDivElement>("div.ttt-overlay");
  for (let overlay of overlays) {
    overlay = overlay as HTMLDivElement;
    const container = overlay.parentElement as HTMLDivElement;
    const colorIndex: number = overlay.innerText === "X" ? 0 : 1;
    overlay.style.color = `var(--gruvbox-${colorSets[colorSetIndex][colorIndex]}-color)`;

    // if (Math.floor(Math.random() * 2) && colorSetIndex === 2) {
    //   overlay.innerText = colorIndex ? "X" : "O";
    // }

    overlay.style.display = overlay.innerText === "" ? "none" : "flex";
    overlay.style.width = container.clientWidth + "px";
    overlay.style.height = container.clientHeight + "px";
    overlay.style.left = container.offsetLeft + 2 + "px";
    overlay.style.top = container.offsetTop + "px";
    overlay.style.fontSize = container.clientWidth * 0.65 + "px";
  }
}

export function gridId(...coords: GridCoord[]): string {
  let id: string = "grid";
  for (const coord of coords) {
    id += `-${coord.y}_${coord.x}`;
  }
  return id;
}
