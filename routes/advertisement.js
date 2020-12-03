const {Router} = require('express')
const Advertisement = require('../models/Advertisement')
const Nanny = require("../models/Nanny")
const Parent = require("../models/Parent")
const auth = require("../middleware/auth.middelware")
const router = Router()

router.post("/", auth, async (req, res) => {
    try {
        const advertisement = await Advertisement.create({userId: req.user.id})
        if (!advertisement) {
            return res.status(400).json({message: "Something go wrong, try again"})
        }
        res.json({message: "Advertisement has been created"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.get("/nannies", async (req, res) => {
    try {
        let nannies = []
        const advertisements = await Advertisement.find({})
        if (!advertisements) {
            return res.status(400).json({message: "There is no advertisements"})
        }

        for (const i of advertisements) {
            let nanny = await Nanny.find({userId: i.userId})
            nannies.unshift(nanny)
        }

        res.json({nannies})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.get("/parents", async (req, res) => {
    try {
        let parents = []
        const advertisements = await Advertisement.find({})
        if (!advertisements) {
            return res.status(400).json({message: "There is no advertisements"})
        }

        for (const i of advertisements) {
            let parent = await Parent.find({userId: i.userId})
            parents.unshift(parent)
        }

        res.json({parents})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const advertisement = await Advertisement.findOne({userId: req.params.id})
        if (!advertisement) {
            return res.status(400).json({message: "This user don`t have advertisement"})
        }
        res.json({responds: advertisement.responds})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Advertisement.deleteOne({userId: req.params.id})
        res.json({message: "Advertisement deleted successfully"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.put('/respond/:id', auth, async  (req, res) => {
    const advertisement = await Advertisement.findOne({userId: req.params.id})
    if (!advertisement) {
        return res.status(400).json({message: "This user don`t have advertisement"})
    }

    if (!advertisement.responds.includes(req.user.id)) {
        advertisement.responds.unshift(req.user.id)
        await Advertisement.updateOne({userId: req.params.id}, {responds: advertisement.responds})
        return res.json({message: "Your respond successfully saved"})
    }
    else {
        return res.json({message: "You are already responded"})
    }
})

module.exports = router