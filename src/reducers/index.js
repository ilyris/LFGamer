import {combineReducers} from 'redux';
import {rootReducer} from './rootReducer';
import {championSelectionReducer} from './championSelectionReducer';

export const reducer = combineReducers({
    root: rootReducer,
    championSelections: championSelectionReducer,
});