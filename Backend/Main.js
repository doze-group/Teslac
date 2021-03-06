const express = require('express');
const app = express();
const cors = require('cors');
const { Config } = require('./Config/App.config');
const mongoose = require('mongoose');

//Puerto
app.set('port', Config.Port);

//Uses
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./Routes/User.routes').UserRoutes(app);
require('./Routes/Project.routes').ProjectRoutes(app);
require('./Routes/Conversation.routes').ConversationRoutes(app);
require('./Routes/Group.routes').GroupRoutes(app);

//init server
const server = app.listen(Config.Port, () => {
    console.log(`http://localhost:${Config.Port}`)
});

//moongose connect
mongoose.connect(Config.Db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`${err}`)
    }

    require('./Controllers/Socket.controller').SocketConfig(server);
});