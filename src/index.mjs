import express from "express";
import usersRouter from "./routes/users.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter)

const PORT = process.env.PORT || 3000;

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.use(loggingMiddleware);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
