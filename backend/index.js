const connectToMongo = require('./db');
connectToMongo();
//express helloworld example
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

//var app = express()
app.use(cors())
app.use(express.json()) //middleware
//Avaialable routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hellooooooooooo loginnnnnnnnn')
//   })

//   app.get('/api/v1/signin', (req, res) => {
//     res.send('Hellooooooooooo signinnnnnnnnn')
//   })



app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`)
})