const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ExtractJwt } = require('passport-jwt');
const { Strategy } = require('passport-local')
const User = require('../models/user');
const express = require('express')
const app = express()

const secret = process.env.JWT_SECRET
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

const strat = new Strategy(opts, function (jwt_payload, done){
    User.findById(jwt_payload.id)
    .then((user) => 
    done(null, user))
    .catch((err) => 
    done(err))
})

passport.use(strat);
app.use(passport.initialize());
app.use(passport.session())

const requireToken = passport.authenticate('jwt', { session: false })

function createUserToken(req, user) {
    if (!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)){
        const err = new Error('Username or password is incorrect');
        err.statusCode = 422;
        throw err;
    }
    return jwt.sign({ id: user_id }, secret, { expiresIn: '24h' });
}
    module.exports = {
        requireToken,
        createUserToken
}