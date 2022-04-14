const MongoClient = require('mongodb').MongoClient
const logger = require('./logger.service')

module.exports = {
    getCollection,
    connect
}
// 'mongodb+srv://LotanT:LotanT@cluster0.vdtxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'song_database'
const dbURL = 'mongodb+srv://LotanT:LotanT@cluster0.vdtxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        logger.info('connect to Mongo');
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




