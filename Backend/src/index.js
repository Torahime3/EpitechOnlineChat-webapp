const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 3000
const HOST = "0.0.0.0"
require('dotenv').config()

//Routes
const userRoutes = require('./routes/usersRoutes');
const privateMessageRoutes = require('./routes/privateMessageRoutes');

const app = express()
mongoose.connect(process.env.DB_URL).then(() => console.log("Connection to database succeed")).catch(err => console.log(err))

//On dit à express d'utiliser le module json pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

//On dit à express d'utiliser les routes définies dans le fichier usersRoutes.js
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/privateMessages', privateMessageRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`)
})