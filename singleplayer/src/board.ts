import { buttonClick } from "./gameLogic";
import { GridCoord } from "./types";

export function setupBoard(element: HTMLDivElement): void {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ust-container";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createBoard({ y: i, x: j });
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  element.appendChild(container);
  positionOverlays(2);
}

function createBoard(ustCoord: GridCoord): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "utt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.id = gridId(ustCoord);
  overlay.className = "ttt-overlay";
  overlay.onclick = (): void => buttonClick(overlay, ustCoord);

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createGrid(ustCoord, { y: i, x: j });
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

function createGrid(ustCoord: GridCoord, uttCoord: GridCoord): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ttt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.id = gridId(ustCoord, uttCoord);
  overlay.className = "ttt-overlay";
  overlay.onclick = (): void => buttonClick(overlay, ustCoord, uttCoord);

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const tttCoord: GridCoord = { y: i, x: j };
      const button: HTMLButtonElement = document.createElement("button");
      button.id = gridId(ustCoord, uttCoord, tttCoord);
      if (Math.random() > 0.7) {
        button.innerText = Math.random() > 0.5 ? "X" : "O";
      }
      button.style.color = `var(--gruvbox-${tttCoord.x % 2 === 0 ? "red" : "blue"}-color)`;
      button.onclick = (): void =>
        buttonClick(button, ustCoord, uttCoord, tttCoord);
      row.appendChild(button);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

function positionOverlays(colorSetIndex: number): void {
  const colorSets = [
    ["red", "blue"],
    ["orange", "green"],
    ["yellow", "teal"],
  ];

  const overlays = document.querySelectorAll<HTMLDivElement>("div.ttt-overlay");
  for (let overlay of overlays) {
    overlay = overlay as HTMLDivElement;
    const container = overlay.parentElement as HTMLDivElement;
    const colorIndex: number = Math.floor(Math.random() * 2);
    overlay.style.color = `var(--gruvbox-${colorSets[colorSetIndex][colorIndex]}-color)`;

    if (Math.floor(Math.random() * 2) && colorSetIndex === 2) {
      overlay.innerText = colorIndex ? "X" : "O";
    }

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
