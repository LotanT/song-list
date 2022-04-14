const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function getSongsByUserName(username) {
    try {
        const collection = await dbService.getCollection('song')
        var songs = await collection.findOne({user: username})
        return songs
    } catch (err) {
        logger.error('cannot find songs', err)
        throw err
    }
}


async function add(song) {
    try {
        const collection = await dbService.getCollection('song')
        const addedSong = await collection.insertOne(song)
        return addedSong
    } catch (err) {
        logger.error('cannot insert song', err)
        throw err
    }
}


module.exports = {
    getSongsByUserName,
    add
}