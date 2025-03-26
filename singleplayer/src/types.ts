export type GridCoord = {
  x: number;
  y: number;
};

export type gridState = "X" | "O" | "";

export type USTBoard = {
  state: gridState;
  inPlayBoard: [GridCoord, GridCoord];
  grid: UTTBoard[][];
};

export type UTTBoard = {
  state: gridState;
  grid: TTTBoard[][];
};

export type TTTBoard = {
  state: gridState;
  grid: gridState[][];
};
