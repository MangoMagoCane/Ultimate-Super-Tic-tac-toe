import "./style.css";
import { setupBoard } from "./board.ts";

const appElement = document.querySelector<HTMLDivElement>("#app")!;
appElement.innerHTML = ``;
addEventListener("resize", () => {
  appElement.innerHTML = ``;
  setupBoard(appElement);
});
setupBoard(appElement);
