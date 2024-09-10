const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).
  catch(error => console.log(error));

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})
