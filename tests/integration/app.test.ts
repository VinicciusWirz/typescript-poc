import supertest from "supertest";
import app from "../../src/app";
import { createRelation } from "../factories/game-platform-factory";
import { createGame, createGameSpecific } from "../factories/games-factory";
import {
  createPlatform,
  createPlatformSpecific,
} from "../factories/platforms-factory";
import { cleanUp, generateRandomRelation, generateRelation } from "../helpers";

const server = supertest(app);

beforeEach(async () => {
  await cleanUp();
});

describe("GET /platforms", () => {
  describe("GET", () => {
    it("should respond with array of platforms registereds", async () => {
      const platform = await createPlatform();
      const platform2 = await createPlatform();
      const { status, body } = await server.get("/platforms");
      expect(status).toBe(200);
      expect(body).toEqual([platform, platform2]);
    });
  });

  describe("POST", () => {
    const validBody = { platform: "Nintendo" };
    it("should respond 201 when registering a new gaming platform", async () => {
      const { status } = await server.post("/platforms").send(validBody);
      expect(status).toBe(201);
    });

    it("should respond 422 when missing body", async () => {
      const { status } = await server.post("/platforms");
      expect(status).toBe(422);
    });

    it("should respond 422 when body is not valid", async () => {
      const { status } = await server
        .post("/platforms")
        .send({ batata: "sim" });

      expect(status).toBe(422);
    });

    it("should respond 409 when gaming platform is already registered", async () => {
      await createPlatformSpecific(validBody.platform);
      const { status } = await server.post("/platforms").send(validBody);
      expect(status).toBe(409);
    });
  });
});

describe("/games", () => {
  const validBody = { game: "Pokemon", platform: "Nintendo" };
  describe("GET", () => {
    it("should respond with an array of games-platform relations", async () => {
      const platform = await createPlatform();
      const game = await createGame();
      const game_platform = await createRelation(game.id, platform.id);
      const { status, body } = await server.get("/games");
      expect(status).toBe(200);
      expect(body).toEqual([
        { id: game_platform.id, game: game.name, platform: platform.name },
      ]);
    });
  });

  describe("POST", () => {
    it("should respond 201 when registering a new game-platform relation (game already in database)", async () => {
      await createGameSpecific(validBody.game);
      await createPlatformSpecific(validBody.platform);
      const { status } = await server.post("/games").send(validBody);
      expect(status).toBe(201);
    });

    it("should respond 201 when registering a new game-platform relation (game NOT in database)", async () => {
      await createPlatformSpecific(validBody.platform);
      const { status } = await server.post("/games").send(validBody);
      expect(status).toBe(201);
    });

    it("should respond 409 when relation is already registered", async () => {
      const { id: game_id } = await createGameSpecific(validBody.game);
      const { id: platform_id } = await createPlatformSpecific(
        validBody.platform
      );
      await createRelation(game_id, platform_id);
      const { status } = await server.post("/games").send(validBody);

      expect(status).toBe(409);
    });

    it("should respond 422 when missing body", async () => {
      const { status } = await server.post("/games");
      expect(status).toBe(422);
    });

    it("should respond 422 when body is not valid", async () => {
      const { status } = await server.post("/games").send({ batata: "sim" });

      expect(status).toBe(422);
    });
  });
  describe("DELETE", () => {
    it("should delete when relation exists and params are valid", async () => {
      const { id: game_id } = await createGameSpecific(validBody.game);
      const { id: platform_id } = await createPlatformSpecific(
        validBody.platform
      );
      const { id } = await createRelation(game_id, platform_id);
      const { status } = await server.delete(`/games/relation/${id}`);
      expect(status).toBe(204);
    });

    it("should respond 422 when id is not an integer", async () => {
      const { status: stringTest } = await server.delete(
        `/games/relation/abacate`
      );
      expect(stringTest).toBe(422);
      const { status: negativeTest } = await server.delete(
        `/games/relation/-99`
      );
      expect(negativeTest).toBe(422);
    });
    it("should respond 404 when relation doesn't exist", async () => {
      const { status } = await server.delete("/games/relation/1");
      expect(status).toBe(404);
    });
  });

  describe("PATCH", () => {
    const newPlatform = "Microsoft Windows";
    it("should change the platform when relation exists and params are valid", async () => {
      const { relation } = await generateRelation(
        validBody.game,
        validBody.platform
      );
      await createPlatformSpecific(newPlatform);
      const { status } = await server
        .patch(`/games/relation/${relation.id}`)
        .send({ game: validBody.game, platform: newPlatform });
      expect(status).toBe(200);
    });

    it("should respond 404 when platform is not registered", async () => {
      const { relation } = await generateRelation(
        validBody.game,
        validBody.platform
      );
      const { status } = await server
        .patch(`/games/relation/${relation.id}`)
        .send({ game: validBody.game, platform: newPlatform });
      expect(status).toBe(404);
    });

    it("should respond 401 when game is different from relation", async () => {
      const { relation } = await generateRelation(
        validBody.game,
        validBody.platform
      );
      const { status } = await server
        .patch(`/games/relation/${relation.id}`)
        .send({ game: "Magic the Gathering", platform: validBody.platform });
      expect(status).toBe(401);
    });

    it("should respond 409 when relation is already registered", async () => {
      const relation1 = await generateRelation("Pokemon", "Nintendo");
      const platform = await createPlatform();
      const relation2 = await createRelation(relation1.game.id, platform.id);

      const { status } = await server
        .patch(`/games/relation/${relation2.id}`)
        .send({ game: "Pokemon", platform: "Nintendo" });
      expect(status).toBe(409);
    });

    it("should respond 422 when id is not an integer", async () => {
      const { status: stringTest } = await server
        .patch(`/games/relation/abacate`)
        .send(validBody);
      expect(stringTest).toBe(422);
      const { status: negativeTest } = await server
        .patch(`/games/relation/-99`)
        .send(validBody);
      expect(negativeTest).toBe(422);
    });

    it("should respond 404 when relation doesn't exist", async () => {
      const { status } = await server
        .patch("/games/relation/1")
        .send(validBody);
      expect(status).toBe(404);
    });
  });
});
