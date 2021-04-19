const types = {
    ADD_TO_TRACK_LIST: 'ADD_TO_TRACK_LIST',
    REMOVE_FROM_TARCK_LIST: ' REMOVE_FROM_TARCK_LIST',
};

export const actions = {
    addTrackList: (data) => ({
        type: types.ADD_TO_TRACK_LIST,
        data
    }),
    removeFromTrackList: (id) => ({
        type: types.REMOVE_FROM_TARCK_LIST,
        id
    })
};

export const initialState = {
    trackList: []
};


export default function reducer(state=initialState, action){
    switch(action.type){
        case types.ADD_TO_TRACK_LIST:
            return {
                ...state,
                trackList: [...state.trackList, action.data]
            }
        case types.REMOVE_FROM_TARCK_LIST:
            return {
                ...state,
                trackList: state.trackList.filter(el =>  el.id !== action.id)
            }
        default:
            return state;
    }
};
