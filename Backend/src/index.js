const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000
const HOST = "0.0.0.0"

require('dotenv').config()


//BDD Connect
mongoose.connect(process.env.DB_URL).then(() => console.log("Connection to database succeed")).catch(err => console.log(err))

//Routes
const userRoutes = require('./routes/usersRoutes');
const channelRoute = require('./routes/channelsRoutes')
const privateMessageRoutes = require('./routes/privateMessageRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const userChannels = require('./routes/userChannelsRoutes');

//logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

//On dit à express d'utiliser le module json pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//On dit à express d'utiliser les routes définies dans les fichiers correspondant
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/channels', channelRoute);
app.use('/api/v1/privateMessages', privateMessageRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/userChannels', userChannels);


app.listen(PORT, HOST, () => {
  console.log(`Discord App Back-end Listening on ${PORT}`)
})