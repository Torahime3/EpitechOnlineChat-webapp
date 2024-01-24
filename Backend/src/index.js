const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('../models/Users')
const PORT = 3000
const HOST = "0.0.0.0"

const app = express()

mongoose.connect("mongodb+srv://bounaamatalal:Retrouver64@cluster0.1hou5pg.mongodb.net/t-jsf?retryWrites=true&w=majority")


app.get('/', (req, res) => {
  res.send('Test The Best HEHEHE')
})

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function(users){
        res.json(users)

    }).catch(function(err){
        //res.json(err)
        res.status(500).json()
    })
})


app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`)
})