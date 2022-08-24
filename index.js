const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5500;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

//APP ROUTES

const usersController = require('./controllers/usersController');
app.use('/users', usersController);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message);
})

app.listen(port, () => {
    console.log(`PORT: ${app.get('port')} LIVE`);
});

