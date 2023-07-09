
# Typescript-poc

This was a proof of concept about starting my studies with TypeScript.

It was a brief introduction of types, designin a CRUD API from the start.

## How to start
Install dependencies with the command:
```
npm install
```

Follow the .env.example to setup the environment variables of your project (host, port, ...)

Generate and populate the database with:
```
npm run migrate:dev
```

Start the application
```
npm run dev
```

## Documentation

#### Returns all the game-relationship in the database

```http
  GET /games
```

Route accepts filtering by query params

`?game=name`

`?plaform=name`

`?game=name&platform=name`

Returns:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `number`   | Id number of game-platform relationship     |
| `game`      | `string`   | Game name                                   |
| `platform`  | `string`   | Platform name                               |


#### Creates new game-platform relationship
```http
  POST /games
```

Body:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `game`      | `string`   | Required! Name of the game                  |
| `platform`  | `string`   | Required! Platform must be registered       |



#### Lists specific game-relationship by id
```http
  GET /games/:id
```
Returns:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `number`   | Id number of game-platform relationship     |
| `game`      | `string`   | Game name                                   |
| `platform`  | `string`   | Platform name                               |

#### Deletes the game-platform relationship

```http
  DELETE /games/relation/:id
```

#### Edit the platform on the desired game-platform relationship

```http
  PATCH /games/relation/:id
```

Body:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `game`      | `string`   | Required! Name must be the same as the relationship id provided                  |
| `platform`  | `string`   | Required! Platform must be registered       |


#### Returns all the platforms in the database

```http
  GET /platforms
```

Returns:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `number`   | Id number of game-platform relationship     |
| `platform`  | `string`   | Platform name                               |


#### Registers new platform
```http
  POST /platforms
```
Platform must not be already registered

Body:
| Parameter   | Type       | Description                                 |
| :---------- | :--------- | :------------------------------------------ |
| `platform`  | `string`   | Required! Platform must **not** be registered|


## Screenshots
Database structure:
![App Screenshot](https://cdn.discordapp.com/attachments/415956290154659840/1124808926551080970/image.png)