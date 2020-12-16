const express = require('express')
const mongoose = require('mongoose')
const config = require('config')


const app = express()
const PORT = 2020

app.use(express.json({extended: true}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/api/auth', require("./routes/auth"))
app.use('/api/profile', require("./routes/profile"))
app.use('/api/advertisement', require("./routes/advertisement"))
app.use("/api/filter", require('./routes/filter'))


async function startApp () {
    try {
        await mongoose.connect(config.get("mongoDbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, ()=>{
            console.log(`Server has been started on port ${PORT}...`)
        })
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

startApp()