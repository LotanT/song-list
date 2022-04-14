
const initialState = {
    songList: null
}

export function songListReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case 'SET_SONGLIST':
            newState = { ...state, songList: action.songList }
            break;
        default:
    }
    return newState;
}
