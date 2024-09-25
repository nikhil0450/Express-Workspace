import express from "express";
import usersRouter from "./routes/users.mjs";
import handleFindUserIndex from "./utils/middlewares.mjs"
import loggingMiddleware from "./utils/loggingMiddleware";

const app = express();
app.use(express.json());
app.use(usersRouter)

const PORT = process.env.PORT || 3000;

app.use(loggingMiddleware);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
