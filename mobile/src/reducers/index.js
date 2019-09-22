import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { commonReducer } from './commonReducer';
import { dataReducer } from './dataReducer';

const reducers = {
    auth: authReducer,
    common: commonReducer,
    data: dataReducer,
}


export default combineReducers(reducers);