import "./style.css";
import { createBoardDOM } from "./board.ts";
import { globalGameState } from "./gameLogic.ts";

export const appElement = document.querySelector<HTMLDivElement>("#app")!;
createBoardDOM(appElement, globalGameState);

addEventListener("resize", () => {
  createBoardDOM(appElement, globalGameState);
});
