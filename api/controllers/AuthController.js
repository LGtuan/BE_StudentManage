const AuthService = require("../services/AuthService")
const moment = require("moment")

module.exports = {
    async login(req, res) {
        const { username, password } = req.body
        try {
            if (!username || !password) {
                return res.json({ message: 'Missing username or password', err: 400 })
            }
            let user = await User.findOne({ username });
            if (!user) {
                return res.json({ message: 'Invalid username or password', err: 401 });
            }

            const hashedPassword = user.password
            const isMatch = AuthService.checkPassword(password, hashedPassword)
            if (!isMatch) {
                return res.json({ message: 'Invalid username or password', err: 401 })
            }

            const token = AuthService.generateToken({ username })
            await User.updateOne({ username }).set({
                accessToken: token,
                lastLogin: moment.now()
            })

            return res.json({ message: 'Login success', err: 200 })
        } catch (err) {
            return res.json({ err: 500, message: err.message })
        }
    },

    async logout(req, res) {

        const username = req.body.username
        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.json({ message: 'Invalid username', err: 401 });
            }

            await User.updateOne({ username }).set({
                accessToken: ''
            })

            return res.json({ message: 'Logout successful', err: 200 });
        } catch (err) {
            return res.json({ err: 500, message: err.message });
        }

    }
}