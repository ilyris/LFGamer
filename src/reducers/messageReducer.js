
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
            const returnedSession = state.userConnections.find((session)=> session.userId === action.payload.userId)
            if(returnedSession == undefined) {
                return  {...state, userConnections: [...state.userConnections, action.payload]};
            } else {
                return state;
            }
        case 'SET_MESSAGES':
            return  {...state, messages: [...state.messages, action.payload]};
        case 'DELETE_MESSAGE_SESSION':
            console.log(action.payload);
            console.log(state.userConnections)
            return {...state, userConnections: [...state.userConnections.filter( session => {
                console.log(session);
                return session.userId !== action.payload.userId
            })]}
        default:
            return state;
    }
};