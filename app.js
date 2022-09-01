const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const shoesRoute = require('./routes/shoes');
const sizeRoute = require('./routes/size');
const parentSkuRoute = require('./routes/parentSku');
const s3Route = require('./routes/s3');

dotenv.config();
var cors = require('cors');

app.use(cors({
  origin: true,
  credentials: true,
}));

mongoose.connect(
  process.env.DB_CONNECT,
  () => console.log('Connnected to DB'),
);

app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/shoes', shoesRoute);
app.use('/api/sizes', sizeRoute);
app.use('/api/parent-sku', parentSkuRoute);
app.use('/api/s3', s3Route);

app.listen(process.env.PORT, () => console.log('Server is up!'));
