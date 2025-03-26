import { GridCoord } from "./types";

export function buttonClick(
  ustCoord: GridCoord,
  uttCoord?: GridCoord,
  tttCoord?: GridCoord,
): void {
  console.log(ustCoord, uttCoord, tttCoord);
}
