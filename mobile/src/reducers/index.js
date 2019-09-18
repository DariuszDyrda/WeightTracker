import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { commonReducer } from './commonReducer';

const reducers = {
    auth: authReducer,
    common: commonReducer,
}


export default combineReducers(reducers);