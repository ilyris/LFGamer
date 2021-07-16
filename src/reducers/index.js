import {combineReducers} from 'redux';
import {rootReducer} from './rootReducer';
import {championSelectionReducer} from './championSelectionReducer';
import {messageReducer} from './messageReducer';

export const reducer = combineReducers({
    root: rootReducer,
    championSelections: championSelectionReducer,
    messageConnections: messageReducer,
});