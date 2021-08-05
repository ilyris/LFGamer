let token = localStorage.getItem('token');
let discordData = localStorage.getItem('discordUserData')

export const initialState = {
    loggedInUser: {},
    isLoggedIn: token ? true : false,
    riotAccount: false,
    isLoading: true,
    discordUserData: discordData ? JSON.parse(discordData) : {},
    profileData: {},
    leagueAccountInfo: {},
    leagueProfileData: {},
};


export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOGGEDIN_USER':
            return  {...state, loggedInUser : action.payload};
        case 'IS_LOGGED_IN':
            return {...state, isLoggedIn : true};
        case 'SANITIZE_USER':
            return {...state, loggedInUser: {}, isLoggedIn : false, };
        case 'SET_ISLOADING':
            return {...state, isLoading: true};
        case 'REMOVE_ISLOADING':
            return {...state, isLoading: false}; 
        case 'SET_DISCORD_DATA':
            return {...state, discordUserData: action.payload};
        case 'SET_PROFILE_DATA':
            return {...state, profileData: action.payload}; 
        case 'SET_LEAGUE_ACCOUNT_INFO':
            return {...state, leagueAccountInfo: action.payload};
            
        default:
            return state;
    }
};