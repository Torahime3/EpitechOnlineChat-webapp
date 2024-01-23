const express = require('express')
const PORT = 3000
const HOST = "0.0.0.0"

const app = express()

app.get('/', (req, res) => {
  res.send('Test The Best HEHEHE')
})

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`)
})