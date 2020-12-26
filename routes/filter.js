const {Router} = require('express')
const Nanny = require("../models/Nanny")
const Parent = require("../models/Parent")
const Advertisement = require("../models/Advertisement")
const router = Router()

router.get('/nanny', async (req, res) => {
    try {
        const nannies = await Advertisement.find({type: "nanny"})
        let cities = []
        for (const nanny of nannies) {
            let result = await Nanny.findOne({userId: nanny.userId})
            cities.unshift(result.city)
        }
        res.json({cities})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", err: err.message})
    }
})

router.get('/parent', async (req, res) => {
    try {
        const parents = await Advertisement.find({type: "parent"})
        let cities = []
        for (const parent of parents) {
            let result = await Parent.findOne({userId: parent.userId})
            cities.unshift(result.city)
        }
        res.json({cities})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", err: err.message})
    }
})

router.post('/nanny', async (req, res)=> {
    try {
        const {age, salaryFrom, salaryTo, city} = req.body
        let whereCommand = {}

        // age: <20 (1); 20-25 (2); 26-30 (3); >30 (4)

        if(age){
            switch (age){
                case "1":
                    whereCommand.age = {$lt: 20}
                    break
                case "2":
                    whereCommand.age = {$gte: 20, $lte: 25}
                    break
                case "3":
                    whereCommand.age = {$gte: 26, $lte: 30}
                    break
                case "4":
                    whereCommand.age = {$gt: 30}
                    break
            }
        }

        if (city) {
            whereCommand.city = city
        }

        if (salaryFrom || salaryTo) {
            if (salaryFrom && salaryTo) {
                whereCommand.salary = {$gte: salaryFrom, $lte: salaryTo}
            } else {
                if (salaryFrom) {
                    whereCommand.salary = {$gte: salaryFrom}
                }
                if (salaryTo) {
                    whereCommand.salary = {$lte: salaryTo}
                }
            }
        }

        const sortedNannies = await Nanny.find(whereCommand)
        let nannies = []
        for (const nanny of sortedNannies) {
            let result = await Advertisement.findOne({userId: nanny.userId, type: "nanny"})
            if (result) {
                nannies.push(nanny)
            }
        }
        res.json({nannies})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", err: err.message})
    }
})

router.post('/parent', async (req, res)=> {
    try {
        const {age, salaryFrom, salaryTo, city} = req.body
        let whereCommand = {}

        // age: <1 (1); 1-3 (2); 4-5 (3); >5 (4)

        if(age){
            switch (age){
                case "1":
                    whereCommand.age = {$lt: 1}
                    break
                case "2":
                    whereCommand.age = {$gte: 1, $lte: 3}
                    break
                case "3":
                    whereCommand.age = {$gte: 4, $lte: 5}
                    break
                case "4":
                    whereCommand.age = {$gt: 5}
                    break
            }
        }

        if (city) {
            whereCommand.city = city
        }

        if (salaryFrom || salaryTo) {
            if (salaryFrom && salaryTo) {
                whereCommand.salary = {$gte: salaryFrom, $lte: salaryTo}
            } else {
                if (salaryFrom) {
                    whereCommand.salary = {$gte: salaryFrom}
                }
                if (salaryTo) {
                    whereCommand.salary = {$lte: salaryTo}
                }
            }
        }

        const sortedParents = await Parent.find(whereCommand)
        let parents = []
        for (const parent of sortedParents) {
            let result = await Advertisement.findOne({userId: parent.userId, type: "parent"})
            if (result) {
                parents.push(parent)
            }
        }
        res.json({parents})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", err: err.message})
    }
})

module.exports = router