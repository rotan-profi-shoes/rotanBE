const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
var cors=require('cors');

app.use(cors({origin:true,credentials: true}));


mongoose.connect(
    process.env.DB_CONNECT, 
    () => console.log('Connnected to DB')
);

app.use(express.json());

// //Route middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(3000, () => console.log('Server is upppp'));