
export const initialState = {
    socket: null,
    userConnections: [],
    messages: [],
};


export const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'SET_SOCKET':
            return  {...state, socket: action.payload};
        case 'SET_USER_CONNECTIONS':
            return  {...state, userConnections: [...state.userConnections, action.payload]};
        case 'SET_MESSAGES':
            console.log(state.messages);
            console.log([ ...state.messages, action.payload])
            return  {...state, messages: [ ...state.messages, action.payload]};
        default:
            return state;
    }
};