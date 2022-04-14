import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { showErrorMsg } from '../services/event-bus.service.js';
import { LoadCSV } from '../cmps/LoadCSV.jsx';

import { addSongList, loadSongList } from '../store/songList.actions';

export function _SongList({ user, songList, addSongList, loadSongList }) {

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else{
      loadSongList(user.username);
    }
  }, []);

  const setListSong = (newSongList) => {
    addSongList({ user: user.username, songList: newSongList });
  };

  let headerKeys;
  if (songList?.songList)
    headerKeys = Object.keys(Object.assign({}, ...songList.songList));

  return (
    <section className="song-list">
      {songList?.songList && (
        <table>
          <thead>
            <tr key={'header'}>
              {headerKeys.map((key) => (
                <th>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {songList.songList.map((item, idx) => (
              <tr key={idx}>
                {Object.values(item).map((val) => (
                  <td key={val}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!songList?.songList && <LoadCSV setSongList={setListSong} />}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    songList: state.songListModule.songList,
  };
}
const mapDispatchToProps = {
  addSongList,
  loadSongList,
};

export const SongList = connect(mapStateToProps, mapDispatchToProps)(_SongList);
