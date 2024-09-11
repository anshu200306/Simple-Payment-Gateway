const express = require('express');
const userRouter = require('./userRoutes');
const accountRouter = require('./accountRoutes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/user', userRouter);
app.use('/account', accountRouter);

app.listen(3000, () => {
    console.log("Server is running");
});