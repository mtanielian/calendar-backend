const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/conn')
const cors = require('cors')

const app = express()
dbConnection()

app.use( express.static('public') )
app.use( express.json() )
app.use( cors() )

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/event', require('./routes/event'))


const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})