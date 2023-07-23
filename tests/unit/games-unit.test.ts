import * as gamesRepository from "../../src/repositories/games.repository";
import * as platformsRepository from "../../src/repositories/platforms.repository";
import * as gamesService from "../../src/services/games.services";
import * as error from "../../src/errors/errors";
import { buildRandomRelation } from "../factories/game-platform-factory";
import { buildGame } from "../factories/games-factory";
import { buildPlatform } from "../factories/platforms-factory";

describe("Games Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const randomGame = buildGame();
  const randomPlatform = buildPlatform();
  const game = randomGame.name;
  const platform = randomPlatform.name;
  const relation = buildRandomRelation(game, platform);
  const relationIds = {
    id: relation.id,
    game_id: randomGame.id,
    platform_id: randomPlatform.id,
  };
  describe("listGames service", () => {
    it("should return list of games-platform relations", async () => {
      const mockRelation = [relation];
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce(mockRelation);
      const promise = await gamesService.listGames(undefined, undefined);
      expect(promise).toEqual(mockRelation);
    });
  });

  describe("createGame service", () => {
    it("should create game", async () => {
      jest
        .spyOn(platformsRepository, "findPlatform")
        .mockResolvedValueOnce(randomPlatform);
      jest.spyOn(gamesRepository, "listGames").mockResolvedValueOnce([]);
      jest
        .spyOn(gamesRepository, "findGameByName")
        .mockResolvedValueOnce(randomGame);
      jest
        .spyOn(gamesRepository, "createRelation")
        .mockResolvedValueOnce(relationIds);

      const promise = await gamesService.createGame(game, platform);
      expect(promise).toEqual(relationIds);
    });

    it("should return not found when platform doesn't exist", async () => {
      jest
        .spyOn(platformsRepository, "findPlatform")
        .mockResolvedValueOnce(null);

      const promise = gamesService.createGame(undefined, undefined);
      expect(promise).rejects.toEqual(error.notFoundError("Platform"));
    });

    it("should return conflict if found relation", async () => {
      jest
        .spyOn(platformsRepository, "findPlatform")
        .mockResolvedValueOnce(randomPlatform);
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce([relation]);

      const promise = gamesService.createGame(undefined, undefined);
      expect(promise).rejects.toEqual(error.conflictError("Game for Platform"));
    });
  });

  describe("deleteGameRelation service", () => {
    it("should delete successfully", async () => {
      jest
        .spyOn(gamesRepository, "findRelation")
        .mockResolvedValueOnce(relationIds);
      jest
        .spyOn(gamesRepository, "deleteRelation")
        .mockResolvedValueOnce(relationIds);
      const promise = await gamesService.deleteGameRelation(1);
      expect(promise).toEqual(relationIds);
    });

    it("should return not found when relation doesn't exist", async () => {
      jest.spyOn(gamesRepository, "findRelation").mockResolvedValueOnce(null);

      const promise = gamesService.deleteGameRelation(1);
      expect(promise).rejects.toEqual(error.notFoundError("Relation"));
    });
  });

  describe("editGameRelation service", () => {
    const randomPlatform2 = buildPlatform();
    const relation2 = buildRandomRelation(game, randomPlatform2.name);
    const relationIdsEdited = {
      id: relation.id,
      game_id: randomGame.id,
      platform_id: randomPlatform2.id,
    };

    it("should edit relation successfully", async () => {
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce([relation]);
      jest
        .spyOn(platformsRepository, "findPlatform")
        .mockResolvedValueOnce(randomPlatform);
      jest
        .spyOn(gamesRepository, "editRelation")
        .mockResolvedValueOnce(relationIdsEdited);
      const promise = await gamesService.editRelation(
        game,
        randomPlatform2.name,
        undefined
      );
      expect(promise).toEqual(relationIdsEdited);
    });

    it("should return not found when no relation was found", async () => {
      jest.spyOn(gamesRepository, "listGames").mockResolvedValueOnce([]);

      const promise = gamesService.editRelation(
        undefined,
        undefined,
        undefined
      );
      expect(promise).rejects.toEqual(error.notFoundError("Relation"));
    });

    it("should return unauthorized when game param is not the same on relation found", async () => {
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce([relation]);

      const promise = gamesService.editRelation(
        "randomGame",
        undefined,
        undefined
      );
      expect(promise).rejects.toEqual(
        error.unauthorized("Game is not on relation id")
      );
    });

    it("should return conflict when relation already exists", async () => {
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce([relation2]);

      const promise = gamesService.editRelation(
        game,
        randomPlatform2.name,
        undefined
      );
      expect(promise).rejects.toEqual(error.conflictError("Game for Platform"));
    });

    it("should return not found when platform is not found", async () => {
      jest
        .spyOn(gamesRepository, "listGames")
        .mockResolvedValueOnce([relation]);
      jest
        .spyOn(platformsRepository, "findPlatform")
        .mockResolvedValueOnce(null);

      const promise = gamesService.editRelation(
        game,
        "randomPlatform",
        undefined
      );
      expect(promise).rejects.toEqual(error.notFoundError("Platform"));
    });
  });
});
