const express = require('express')
const mongoose = require('mongoose')
const config = require('config')


const app = express()
const PORT = 2020


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