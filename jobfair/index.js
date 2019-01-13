const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');
const changePasswordRouter = require('./routes/changePassword');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log("Could not connect to database: " + err);
    } else {
        console.log("Connected to database " + config.db)
    }
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/admin', authRouter);


app.get('/profile', (req, res) => {
    res.send(req.decoded);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log("Listening on 8080");
})
