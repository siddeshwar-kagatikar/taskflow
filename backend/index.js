const connecttoMongo = require('./db')
const express = require('express')
var cors = require('cors')
connecttoMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/slots',require('./routes/slots'))

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})