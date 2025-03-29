export type GridCoord = {
  x: number;
  y: number;
};

export type GridState = "X" | "O" | "";

export type GridObject = {
  state: GridState;
};

export type GameMove = {
  ustMove: GridCoord;
  uttMove: GridCoord;
  tttMove: GridCoord;
};

export type GameState = {
  player: GridState;
  inPlayUttBoard: GridCoord | undefined;
  inPlayTttBoard: GridCoord | undefined;
  board: USTBoard;
};

export type USTBoard = {
  state: GridState;
  grid: UTTBoard[][];
};

export type UTTBoard = {
  state: GridState;
  grid: TTTBoard[][];
};

export type TTTBoard = {
  state: GridState;
  grid: GridObject[][];
};

export interface Board {
  state: GridState;
  grid: GridObject[][];
}
