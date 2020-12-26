const {Router} = require('express')
const Nanny = require('../models/Nanny')
const Parent = require('../models/Parent')
const User = require('../models/User')
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

router.get('/:id', async (req, res) => {
    try{
        let user = null;

        user = await Nanny.findOne({userId: req.params.id})
        if (user) {
            return res.json({user: user})
        }

        user = await Parent.findOne({userId: req.params.id})
        if (user) {
            return res.json({user: user})
        }

        if (!user) {
            return res.status(400).json({message: "Something go wrong, try again"})
        }
    } catch (err){
        res.status(400).json({message: "Something go wrong, try again"})
    }
})

router.get('/email/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        return res.json({email: user.email})

    } catch (err){
        res.status(400).json({message: "Something go wrong, try again"})
    }
})


module.exports = router