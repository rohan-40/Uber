// Imported for creating express Server
const express = require('express');
const app = express();

// Imported for getting env variables
require('dotenv').config();

// Imported for accessing req for particular domain
const cors = require('cors');

// Imported for Db config
const db = require('./db/db');



const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')

const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("Hello, Welcome to Uber");
});

app.use('/user',userRoutes);
app.use('/captain',captainRoutes);

app.listen(Port, () => {
    console.log(`Port is Listening on ${Port}`);
});
