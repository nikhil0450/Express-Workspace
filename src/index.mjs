import express, { request, response } from "express";
import { query, validationResult, body, matchedData } from "express-validator";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.use(loggingMiddleware);

const handleFindUserIndex = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  request.parsedId = parsedId;
  next();
};

const mockUsers = [
  { id: 1, userName: "Jack123", fullName: "Jackson Benny" },
  { id: 2, userName: "Henry456", fullName: "Henry Pie" },
  { id: 3, userName: "Adam789", fullName: "Adam Den" },
];

// Get
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello world" });
});

app.get("/users", (request, response) => {
  response.send(mockUsers);
});

// Request Params
app.get("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

// Query Params
app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3 to 10 characters"),
  (request, response) => {
    // console.log(request["express-validator#contexts"]);
    const result = validationResult(request);
    console.log(result);
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
  }
);

// Post
app.post(
  "/api/users",
  body("userName")
    .notEmpty()
    .withMessage("userName cannot be empty")
    .isString()
    .withMessage("userName must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("userName must be atleast 3 to 15 characters"),
    [ 
      // for multiple validations 
      body("fullName")
      .notEmpty()
      .withMessage("fullName cannot be empty")
      .isString()
      .withMessage("fullName must be a string")
      .isLength({ min: 5, max: 30 })
      .withMessage("fullName must be atleast 5 to 30 characters")],
  (request, response) => {
    // console.log(request.body);
    const result = validationResult(request);
    console.log(result);
    if(!result.isEmpty()) return response.status(400).send({errors: result.array()})

    const data = matchedData(request);
    // console.log(data);
    // const { body } = request;
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);

// Put
app.put("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { body, findUserIndex, parsedId } = request;
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

// Patch
app.patch("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

// Delete
app.delete("/api/users/:id", handleFindUserIndex, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
