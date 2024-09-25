import { Router } from "express";
import {
  checkSchema,
  validationResult,
  query,
  matchedData,
} from "express-validator";
import { mockUsers } from "../utils/userConstants.mjs";
import { validationSchemas } from "../utils/validationSchemas.mjs";
import handleFindUserIndex from "../utils/middlewares.mjs";


const router = Router();

// Get
router.get("/", (request, response) => {
  response.status(201).send(`<center><h1>Hello World</h1></center>`);
});

router.get("/users", (request, response) => {
  response.send(mockUsers);
});

// Request Params
router.get("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

// Query Params
router.get("/api/users", (request, response) => {
  const {
    query: { filter, value },
  } = request;
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => {
        return user[filter].includes(value);
      })
    );
  return response.send(mockUsers);
});

// Post
router.post(
  "/api/users",
  checkSchema(validationSchemas),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);

// Put
router.put(
  "/api/users/:id",
  checkSchema(validationSchemas),
  handleFindUserIndex,
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);
    const { parsedId, findUserIndex } = request;
    mockUsers[findUserIndex] = { id: parsedId, ...data };
    return response.sendStatus(200);
  }
);

// Patch
router.patch(
  "/api/users/:id",
  handleFindUserIndex,
  (request, response) => {
    const { findUserIndex, body } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
  }
);

// Delete
router.delete("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
