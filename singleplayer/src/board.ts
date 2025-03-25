export function setupBoard(element: HTMLDivElement): void {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ust-container";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createBoard(i * 3 + j);
      // button.onclick = (): void => buttonClick(idNumber * 9 + i * 3 + j);
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  element.appendChild(container);
  positionOverlays(2);
}

function createBoard(idNumber: number): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "utt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.className = "ttt-overlay";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const gridIndex: number = idNumber * 9 + (i * 3 + j);
      const grid: HTMLDivElement = createGrid(gridIndex);
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

function createGrid(idNumber: number): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ttt-container";

  const overlay: HTMLDivElement = document.createElement("div");
  overlay.className = "ttt-overlay";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const button: HTMLButtonElement = document.createElement("button");
      const buttonIndex: number = idNumber * 9 + (i * 3 + j);
      if (Math.floor(Math.random() * 2)) {
        button.innerText = Math.floor(Math.random() * 2) ? "X" : "O";
      }
      button.style.color = `var(--gruvbox-${buttonIndex % 2 == 0 ? "red" : "green"}-color)`;
      button.onclick = (): void => buttonClick(buttonIndex);
      row.appendChild(button);
    }

    container.appendChild(row);
  }

  container.appendChild(overlay);
  return container;
}

function buttonClick(idNumber: number): void {
  console.log(idNumber);
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
    console.log(container.style);

    const colorIndex: number = Math.floor(Math.random() * 2);
    overlay.style.color = `var(--gruvbox-${colorSets[colorSetIndex][colorIndex]}-color)`;
    if (Math.floor(Math.random() * 2)) {
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
