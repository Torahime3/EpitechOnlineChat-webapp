const express = require('express');
const http = require('http'); 
const socketIo = require('socket.io');
const cors = require('cors');

const app = express()
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],

  }
});
app.set('socketio', io);

const bodyParser = require('body-parser')
const PORT = 3000
const HOST = "0.0.0.0"

require('dotenv').config()

//BDD Connect
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL , { 
  autoIndex: true,
}).then(() => console.log("Connection to database succeed")).catch(err => console.log(err))

//Routes
const userRoutes = require('./routes/usersRoutes');
const channelRoute = require('./routes/channelsRoutes')
const messagesRoutes = require('./routes/messagesRoutes');
const userChannels = require('./routes/userChannelsRoutes');
const { setUserStatus } = require('./controllers/usersController');



//logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//On dit à express d'utiliser les routes définies dans les fichiers correspondant
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/channels', channelRoute);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/userChannels', userChannels);

io.on('connection', (socket) => {

  socket.on('login', (token) => {
    console.log('user connected');
    setUserStatus(true, token, app);
  });

  socket.on('logout', (token) => {
    console.log('user logout');
    setUserStatus(false, token, app) ;

    socket.on('disconnect', () => {
      console.log('user disconnected');
      setUserStatus(false, token, app);
    });
  });

})

server.listen(PORT, HOST, () => {
  console.log(`Discord App Back-end Listening on ${PORT}`)
})