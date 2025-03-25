export function setupBoard(element: HTMLDivElement): void {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "utt-container";
  // container.style.width = "80%";
  console.log("'" + container.style.width + "'");
  // container.style.height = "80%";

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
}

function createBoard(idNumber: number): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ttt-container";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const grid: HTMLDivElement = createGrid(i * 3 + j);
      // button.onclick = (): void => buttonClick(idNumber * 9 + i * 3 + j);
      row.appendChild(grid);
    }

    container.appendChild(row);
  }

  return container;
}

function createGrid(idNumber: number): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "ttt-container";

  for (let i = 0; i < 3; i++) {
    const row: HTMLDivElement = document.createElement("div");
    row.className = "ttt-row";

    for (let j = 0; j < 3; j++) {
      const button: HTMLButtonElement = document.createElement("button");
      button.onclick = (): void => buttonClick(idNumber * 9 + (i * 3 + j));
      row.appendChild(button);
    }

    container.appendChild(row);
  }

  return container;
}

function buttonClick(idNumber: number): void {
  console.log(idNumber);
}
