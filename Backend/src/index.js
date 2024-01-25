const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 3000
const HOST = "0.0.0.0"

//Routes
const userRoutes = require('./routes/usersRoutes');

const app = express()
mongoose.connect("mongodb+srv://bounaamatalal:Retrouver64@cluster0.1hou5pg.mongodb.net/t-jsf?retryWrites=true&w=majority")

//On dit à express d'utiliser le module json pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//On dit à express d'utiliser les routes définies dans le fichier usersRoutes.js
app.use('/api/v1/users', userRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`)
})