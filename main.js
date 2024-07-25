const express = require("express");
const cors = require("cors");
const path = require("path");

const envPath = '.env';
require("dotenv").config({ path: envPath });

const port = process.env.API_PORT;
const host = process.env.API_HOST;

const app = express();

const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/user");
// const statisticsRouter = require("./src/routes/statistics");
// const quizRouter = require("./src/routes/quiz");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "view")));

app.use(cors());

app.use("/", indexRouter);
app.use("/user", userRouter);
// app.use("/statistics", statisticsRouter);
// app.use("/quiz", quizRouter);

app.listen(port, function () {
    console.log(`                                                                                
    Servidor de aplicação rodando no endereço: http://${host}:${port} \n\n`);
});