const express = require('express')
const app = express()
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts")
const path = require("path");
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000


/********************Assests *********************/

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

/*************** setting template engine **********/

app.use(expressLayout);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/****************** GET Routes *********************/

app.get('/', (req, res)=>{
    res.render('home')
})

/************* Socket *********** */

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('Connected');
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
})

http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})

