export type error = {
  type: string;
  message: string;
};

export type request = {
  rows: requestRow[];
  rowCount: number;
};

export type requestRow = {
  id: number;
  name: string;
  game: string;
  platform: string;
};
