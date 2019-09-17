import { combineReducers } from 'redux';
import { authReducer } from './authReducer'

const reducers = {
    auth: authReducer,
}

export default combineReducers(reducers);