import express, { request, response } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, userName: "Jack123", fullName: "Jackson Benny"},
    { id: 2, userName: "Henry456", fullName: "Henry Pie"},
    { id: 3, userName: "Adam789", fullName: "Adam Den"}
]

app.get("/", (request, response)=>{
    response.status(201).send({ msg: "Hello world"});
})

app.get("/users", (request, response)=>{
    response.send(mockUsers)
})

// Request Params
app.get("/api/users/:id", (request, response)=>{
    const parsedId = parseInt(request.params.id);
    if(isNaN(parsedId)) return response.status(400).send({msg: "Bad request. Invalid Id"});
    const findUser = mockUsers.find((user)=> user.id === parsedId)
    if(!findUser) return response.status(404).send({msg: "Error, User not found!"})
    return response.send(findUser)
})

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`);
})