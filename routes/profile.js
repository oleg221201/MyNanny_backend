const {Router} = require('express')
const Nanny = require('../models/Nanny')
const Parent = require('../models/Parent')
const auth = require("../middleware/auth.middelware")
const router = Router()


router.post("/create/nanny", auth, async (req, res) => {
    try{
        const {name, age, city, salary, description} = req.body

        const candidate = await Nanny.findOne({userId: req.user.id})
        if (candidate) return res.status(400).json({message: "This user already created profile"})

        await Nanny.create({userId: req.user.id, name, age, city, salary, description})

        res.status(201).json({message: "Profile has been create successfully"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", error: err.message})
    }
})

router.post("/create/parent", auth, async (req, res) => {
    try{
        const {parentName, childName, childAge, city, salary, description} = req.body

        const candidate = await Nanny.findOne({userId: req.user.id})
        if (candidate) return res.status(400).json({message: "This user already created profile"})

        await Parent.create({userId: req.user.id, parentName, childName, childAge, city, salary, description})

        res.status(201).json({message: "Profile has been create successfully"})
    } catch (err) {
        res.status(400).json({message: "Something go wrong, try again", error: err.message})
    }
})

router.get('/', auth, async (req, res) => {
    try{
        let user = null;

        user = await Nanny.findOne({userId: req.user.id})
        if (user) {
            return res.json({user: user, isCreated: true})
        }

        user = await Parent.findOne({userId: req.user.id})
        if (user) {
            return res.json({user: user, isCreated: true})
        }

        if (!user) {
            return res.json({isCreated: false})
        }
    } catch (err){
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.put('', auth, async (req, res) => {
    try {
        if (req.body.type === "nanny") {
            const {name, age, city, salary, description} = req.body
            await Nanny.updateOne({userId: req.user.id},
                {name, age, city, salary, description})
            return res.json({message: "Profile updated successfully"})
        }
        if (req.body.type === "parent") {
            const {parentName, childName, childAge, city, salary, description} = req.body
            await Parent.updateOne({userId: req.user.id},
                {parentName, childName, childAge, city, salary, description})
            return res.json({message: "Profile updated successfully"})
        }
        res.status(400).json({message: "Type error (no type)"})
    } catch (err){
        res.status(400).json({err: err.message, message: "Something go wrong, try again"})
    }
})

module.exports = router