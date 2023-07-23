import * as platformsRepository from "../../src/repositories/platforms.repository";
import * as error from "../../src/errors/errors";
import * as platformsService from "../../src/services/platforms.services";
import { buildPlatform } from "../factories/platforms-factory";

describe("Platforms Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const platform = buildPlatform();

  describe("listPlatforms service", () => {
    it("should return array of platforms", async () => {
      jest
        .spyOn(platformsRepository, "listPlatforms")
        .mockResolvedValueOnce([platform]);
      const promise = await platformsService.listPlatforms(undefined);
      expect(promise).toEqual([platform]);
    });
  });

  describe("createPlatform service", () => {
    it("should create platform", async () => {
      jest
        .spyOn(platformsRepository, "listPlatforms")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(platformsRepository, "createPlatform")
        .mockResolvedValueOnce(platform);

      const promise = await platformsService.createPlatform(platform.name);
      expect(promise).toEqual(platform);
    });

    it("should return conflict when platform already exists", async () => {
      jest
        .spyOn(platformsRepository, "listPlatforms")
        .mockResolvedValueOnce([platform]);

      const promise = platformsService.createPlatform(platform.name);
      expect(promise).rejects.toEqual(error.conflictError("Platform"));
    });
  });
});
