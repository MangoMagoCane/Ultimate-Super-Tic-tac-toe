export type GridCoord = {
  x: number;
  y: number;
};

export type gridState = "X" | "O" | "";

export type USTBoard = {
  inPlayBoard: [GridCoord?, GridCoord?];
  state: gridState;
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
