const songService = require('./song.service.js');
const logger = require('../../services/logger.service')

async function getSongs(req, res) {
  try {
    let queryParams = req.params.username;
    const songs = await songService.getSongsByUserName(queryParams)
    res.json(songs);
  } catch (err) {
    logger.error('Failed to get songs', err)
    res.status(500).send({ err: 'Failed to get songs' })
  }
}

async function addSong(req, res) {
  try {
    let song = req.body;
    await songService.add(song)
    res.json(song)
  } catch (err) {
    logger.error('Failed to add song', err)
    res.status(500).send({ err: 'Failed to add song' })
  }
}

module.exports = {
  getSongs,
  addSong
}
