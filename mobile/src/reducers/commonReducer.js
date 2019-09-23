import ActionTypes from '../consts/ActionTypes'
import { strings } from '../consts/strings';

const INITIAL_STATE = {
    isLoading: false,
    isSignUpSuccessful: false,
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
        case ActionTypes.MESSAGE: {
            const message = action.payload
            return { ...state, message };
        }
        case ActionTypes.SIGNUP: {
            const message = strings.SIGNUP_SUCCESS;
            const isSignUpSuccessful = true;
            return { ...state, message, isSignUpSuccessful };
        }
        case ActionTypes.CLEAR_MESSAGES: {
            const message = null;
            return { ...state, message };
        }
        default:
            return state;
    }
}
