import ActionTypes from '../consts/ActionTypes'
import { strings } from '../consts/strings';

const INITIAL_STATE = {
    isLoading: false,
    message: null,
}

export const commonReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.LOADING: {
            const isLoading = action.payload;
            return {...state, isLoading};
        }
        case ActionTypes.CONNECTION_ERROR: {
            const message = strings.CONNECTION_ERROR_MESSAGE;
            return { ...state, message };
        }
        case ActionTypes.LOGIN_ERROR: {
            const message = action.payload
            return { ...state, message };
        }
        case ActionTypes.CLEAR_MESSAGES: {
            const message = null;
            return { ...state, message };
        }
        default:
            return state;
    }
}
