import { songListService } from '../services/songList.service';

export function addSongList(newSongList) {
  return async (dispatch) => {
    try {
      const songList = await songListService.add(newSongList);
      dispatch({
        type: 'SET_SONGLIST',
        songList,
      });
    } catch (err) {
      console.log('Cannot set song list', err);
    }
  };
}

export function loadSongList(songListName) {
  return async (dispatch) => {
    try {
      const songList = await songListService.getById(songListName);
      dispatch({
        type: 'SET_SONGLIST',
        songList,
      });
    } catch (err) {
      console.log('Cannot set song list', err);
    }
  };
}
