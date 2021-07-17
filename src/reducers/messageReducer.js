
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
            return  {...state, messages: [ ...state.messages, action.payload]};
            case 'DELETE_MESSAGE_SESSION':
            return {...state, userConnections: [...state.userConnections.filter( session => session.userId !== action.payload)]}
        default:
            return state;
    }
};