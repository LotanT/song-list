import { httpService } from './http.service'

export const songListService = {
    getById,
    add
}

async function getById(songListName) {
    const songList = await httpService.get(`song/${songListName}`)
    return songList
}

async function add(songList) {
    return await httpService.post('song', songList)
}