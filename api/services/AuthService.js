const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
var secretKey = process.env.SECRET_KEY

module.exports = {
    generateToken(payload) {
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return token
    },
    verifyToken(token) {
        try {
            // const decode = jwt.verify()
        } catch (e) {

        }
    },
    hashPassword(password) {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)
        return hashedPassword
    },
    checkPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword)
    }
}