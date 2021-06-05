import {combineReducers} from 'redux';
import {rootReducer} from './rootReducer';

export const reducer = combineReducers({
    root: rootReducer,
});