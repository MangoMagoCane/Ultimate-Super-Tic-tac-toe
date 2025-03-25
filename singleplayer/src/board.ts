export function setupBoard(element: HTMLDivElement): void {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ust-container";
  element.appendChild(container);

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";
    container.appendChild(row);

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createBoard(i * 3 + j);
      // button.onclick = (): void => buttonClick(idNumber * 9 + i * 3 + j);
      row.appendChild(grid);
    }
  }

  positionOverlays();
}

function createBoard(idNumber: number): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "utt-container";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";
    container.appendChild(row);

    for (let j = 0; j < 3; j++) {
      const gridIndex: number = idNumber * 9 + (i * 3 + j);
      const grid: HTMLDivElement = createGrid(gridIndex);
      row.appendChild(grid);
    }
  }

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
      // button.innerText = `${}(buttonIndex).padStart(3, "0"} `;
      button.innerText = Math.floor(Math.random() * 2) ? "X" : "O";
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

function positionOverlays(): void {
  const overlays = document.querySelectorAll<HTMLDivElement>("div.ttt-overlay");

  for (let overlay of overlays) {
    overlay = overlay as HTMLDivElement;
    const container = overlay.parentElement as HTMLDivElement;
    console.log(overlay.style);

    const randBool: Boolean = !!Math.floor(Math.random() * 2);
    overlay.style.color = `var(--gruvbox-${randBool ? "red" : "green"}-color)`;
    overlay.innerHTML = randBool ? "X" : "O";

    overlay.style.top = container.clientTop + "px";
    overlay.style.left = container.clientLeft + "px";
    overlay.style.width = container.clientWidth + "px";
    overlay.style.height = container.clientHeight + "px";
    overlay.style.top = container.offsetTop + "px";
    overlay.style.left = container.offsetLeft + "px";
    overlay.style.fontSize = container.clientWidth + "px";
  }
}
