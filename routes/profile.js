const {Router} = require('express')
const Nanny = require('../models/Nanny')
const Parent = require('../models/Parent')
const auth = require("../middleware/auth.middelware")
const router = Router()


router.post("/create/nanny", async (req, res) => {
    try{
        const {userId, name, age, city, salary, description} = req.body

        const candidate = await Nanny.findOne({userId})
        if (candidate) return res.status(400).json({message: "This user already created profile"})

        await Nanny.create({userId, name, age, city, salary, description})

        res.status(201).json({message: "Profile has been create successfully"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", error: err.message})
    }
})

router.post("/create/parent", async (req, res) => {
    try{
        const {userId, parentName, childName, childAge, city, salary, description} = req.body

        const candidate = await Nanny.findOne({userId})
        if (candidate) return res.status(400).json({message: "This user already created profile"})

        await Parent.create({userId, parentName, childName, childAge, city, salary, description})

        res.status(201).json({message: "Profile has been create successfully"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", error: err.message})
    }
})

router.get('/:type', auth, async (req, res) => {
    try{
        let user = null;

        if (req.params.type === "nanny") {
            user = await Nanny.find({userId: req.user.id})
        }
        if (req.params.type === "parent") {
            user = await Parent.find({userId: req.user.id})
        }

        if (!user) return res.status(400).json({message: "Type error (no type)"})

        res.json({user})
    } catch (err){
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

module.exports = router()