
export const initialState = {
    selectedChampions: [],
    selectedRank: [],
    selectedLanes: [],
    micEnabled: false,
};


export const championSelectionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SELECTED_CHAMPIONS':
            return  {...state, selectedChampions: action.payload};
        case 'CLEAR_SELECTED_CHAMPIONS':
            return  {...state, selectedChampions: action.payload};
        case 'SET_SELECTED_RANK':
            return  {...state, selectedRank: action.payload};
        case 'CLEAR_SELECTED_RANK':
            return  {...state, selectedRank: action.payload};
        case 'SET_SELECTED_LANES':
            return  {...state, selectedLanes: action.payload};
        case 'CLEAR_SELECTED_LANES':
            return  {...state, selectedLanes: action.payload};
        case 'SET_IS_MIC_ENABLED':
            return  {...state, micEnabled: action.payload};
        case 'CLEAR_IS_MIC_ENABLED':
            return  {...state, micEnabled: action.payload};
        default:
            return state;
    }
};