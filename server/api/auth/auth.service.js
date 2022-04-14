const bcrypt = require('bcrypt')
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')

module.exports = {
    signup,
    login
}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}   

async function signup(username, password, email) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, email: ${email}`)
    if (!username || !password || !email) return Promise.reject('email, username and password are required!')

    const userExist = await getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    const user = add({ username, password: hash, email })
    return
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            email: user.email,
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}