import "./style.css";
import { createBoardDOM } from "./board.ts";
import { copyMoves, globalGameState, playMoves } from "./gameLogic.ts";

export const appElement = document.querySelector<HTMLDivElement>("#app")!;

const copyMovesButton: HTMLButtonElement = document.createElement("button");
copyMovesButton.innerText = "copy moves to clipboard";
copyMovesButton.onclick = copyMoves;

const playMovesButton: HTMLButtonElement = document.createElement("button");
playMovesButton.innerText = "play moves from clipboard";
playMovesButton.onclick = async () => {
  playMovesButton.disabled = true;
  await playMoves();
  playMovesButton.disabled = false;
};

appElement.append(copyMovesButton, playMovesButton);

createBoardDOM(appElement, globalGameState);

addEventListener("resize", () => {
  createBoardDOM(appElement, globalGameState);
});
