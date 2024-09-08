import express, { request, response } from "express";

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

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
app.get("/api/users/:id", (request, response) => {
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad request. Invalid Id" });
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser)
    return response.status(404).send({ msg: "Error, User not found!" });
  return response.send(findUser);
});

// Query Params
app.get("/api/users", (request, response) => {
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
app.post("/api/users", (request, response)=>{
    // console.log(request.body);
    const { body } = request;
    const newUser = {
        id: mockUsers[mockUsers.length - 1].id + 1,
        ...body
    }
    mockUsers.push(newUser)
    return response.status(201).send(newUser)
})

// Put 
app.put("/api/users/:id", (request, response)=>{
    const { body, params: { id } } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user)=> user.id === parsedId)
    // if the findIndex() is unable to find the index of user in array, then it will return -1, hence below condition applies
    if(findUserIndex < 0) return response.sendStatus(404);
    mockUsers[findUserIndex] = {id: parsedId, ...body}
    return response.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
