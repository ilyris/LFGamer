let token = localStorage.getItem('token');
let discordData = localStorage.getItem('discordUserData')

export const initialState = {
    loggedInUser: {},
    isLoggedIn: token ? true : false,
    riotAccount: false,
    isLoading: false,
    discordUserData: discordData ? JSON.parse(discordData) : {},
};


export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOGGEDIN_USER':
            return  {...state, loggedInUser : action.payload};
        case 'IS_LOGGED_IN':
            return {...state, isLoggedIn : true};
        case 'SANITIZE_USER':
            return {...state, loggedInUser: {}, isLoggedIn : false, 
            newSignedUpUser: { 
                // email: '', 
                // username: '', 
                // interests: []
            } 
        };
        case 'SET_ISLOADING':
            return {...state, isLoading: true};
        case 'REMOVE_ISLOADING':
            return {...state, isLoading: false}; 
        case 'SET_DISCORD_DATA':
            return {...state, discordUserData: action.payload}; 
        default:
            return state;
    }
};