const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const voteRouter = require('./routers/vote');
const candRouter = require('./routers/candidate');
const resRoutes=require('./routers/result')
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(voteRouter);
app.use(candRouter);
app.use(resRoutes);

module.exports = app;
