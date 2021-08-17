
export const initialState = {
    searchedChampions: [],
    searchedRank: [],
    searchedLanes: [],
    searchedMicEnabled: false,
};


export const duoListingReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SEARCHED_CHAMPIONS':
            return  {...state, searchedChampions: action.payload};
        case 'CLEAR_SEARCHED_CHAMPIONS':
            return  {...state, searchedChampions: action.payload};
        case 'SET_SEARCHED_RANK':
            return  {...state, searchedRank: action.payload};
        case 'CLEAR_SEARCHED_RANK':
            return  {...state, searchedRank: action.payload};
        case 'SET_SEARCHED_LANES':
            return  {...state, searchedLanes: action.payload};
        case 'CLEAR_SEARCHED_LANES':
            return  {...state, searchedLanes: action.payload};
        case 'SET_SEARCHED_IS_MIC_ENABLED':
            return  {...state, searchedMicEnabled: action.payload};
        case 'CLEAR_SEARCHED_IS_MIC_ENABLED':
            return  {...state, searchedMicEnabled: action.payload};
        default:
            return state;
    }
};