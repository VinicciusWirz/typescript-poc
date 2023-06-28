export type Error = {
  type: string;
  message: string;
};

export type ServerResponse = {
  rows: RequestListing[];
  rowCount: number;
};

export type RequestListing = {
  id: number;
  game: string;
  platform: string;
};

export type RequestPlatform = Omit<RequestListing, "game">;

export type GamePlatform = Omit<RequestListing, "id">;

export type Platform = Omit<GamePlatform, "game">;

export type FullRelation = {
  id: number;
  game_id: number;
  platform_id: number;
  game: string;
  platform: string;
};
