const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemsRouter = require('./routes/items');
const stripeRouter = require('./routes/stripeRouter');
const ordersRouter = require('./routes/orders');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
    .catch(err => console.log('Error connecting to db: ', err.message));

app.use('/items', itemsRouter);

app.use('/stripe', stripeRouter);

app.use('/orders', ordersRouter);

