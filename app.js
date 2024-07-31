const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');

const environment = 'development';
// const environment = 'production';

const envPath = environment === 'development' ? '.env.dev' : '.env';

require("dotenv").config({ path: envPath });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: { error: 'Muito rápido! Tente novamente mais tarde.' },
});

const app = express();

const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/user");
// const statisticsRouter = require("./src/routes/statistics");
// const quizRouter = require("./src/routes/quiz");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "view")));

app.use(cors());
app.use(compression({
    threshold: 10240, // Comprima respostas maiores ou iguais a 10 KB (10240 bytes)
}));
app.use(limiter);
app.use(helmet());

app.use("/", indexRouter);
app.use("/user", userRouter);
// app.use("/statistics", statisticsRouter);
// app.use("/quiz", quizRouter);

module.exports = app;
