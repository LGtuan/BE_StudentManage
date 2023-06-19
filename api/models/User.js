module.exports = {
    attributes: {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
        email: { type: 'string', required: true },
        fullName: { type: 'string', required: false },
        lastLogin: { type: 'number', required: false },
        salt: { type: 'string', required: false },
        accessToken: { type: 'string', required: false },
        expirationTime: { type: 'number', required: false }
    }
}