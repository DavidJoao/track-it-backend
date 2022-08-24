const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { requireToken, createUserToken } = require('../middleware/authentication')


//GET ALL USERS
router.get('/', requireToken, async (req, res, next) =>{
    try{
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

//GET USERS BY ID
router.get('/:id', requireToken, async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch(err) {
        next(err)
    }
})

//GET USER BY THEIR USERNAME
router.get('/username/:username', async(req, res, next) =>{
    try{
        const user = await User.findOne({ username: req.params.username })
        res.json(user)
    } catch(err) {
        next(err)
    }
})

//POST || CREATE ACCOUNT 
router.post('/signup', (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => ({
        username: req.body.username,
        feet: req.body.feet,
        inches: req.body.inches,
        initialWeight: req.body.initialWeight,
        goal: req.body.goal,
        currentWeight: req.body.currentWeight,
        password: hash,
    }))
    .then(user => User.create(user))
    .then(user => res.status(201).json(user))
    .catch(next)
})

//POST || LOG INTO ACCOUNT

router.post('/login', (req, res, next) => {
    const user = User.findOne({ username: req.body.username })
    .then(user => createUserToken(req, user))
    .then(token => res.json({ token }))
    .catch(next)
})

//UPDATE USER

router.post('/:id', requireToken, async(req, res, next) =>{
    try{
        const user = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
        if(user) {
            res.json(user)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})

//DELETE USER

router.delete('/:id', requireToken, async(req, res, next) =>{
    try{
        const user = await User.findOneAndDelete(req.params.id)
        res.json(user)
    } catch(err) {
        next(err)
    }
})

module.exports = router;
