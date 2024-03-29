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
const changePasswordRouter = require('./routes/changePassword');
const studentRouter = require('./routes/student');
const companyRouter = require('./routes/company');
const openingRouter = require('./routes/opening');
const fairRouter = require('./routes/fair');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("Could not connect to database: " + err.message);
    } else {
        console.log("Connected to database " + config.db)
    }
});

app.use(cors({ origin: 'http://localhost:4200' }));
// app.use('/uploads', express.static('/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/student', studentRouter);
app.use('/company', companyRouter);
app.use('/opening', openingRouter);
app.use('/fair', fairRouter);
app.use('/uploads', express.static(__dirname + '/uploads'));


// app.get('/profile', (req, res) => {
//     res.send(req.decoded);
// });


// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log("Listening on 8080");
})
