import "./style.css";
import { setupBoard } from "./board.ts";
// import { setupCounter } from "./counter.ts";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = ``;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
setupBoard(document.querySelector<HTMLDivElement>("#app")!);
