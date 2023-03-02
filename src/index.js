const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = 3003;
const mongodb = require('./mongodb');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
dotenv.config();
//middlewares
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended:true}))
app.use(cors())

// middleware ROutes
app.use('/user', userRoute)

app.listen(port, ()=> {
    console.log(`The server is running at ${port}`)
})



