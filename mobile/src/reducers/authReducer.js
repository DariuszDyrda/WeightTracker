import ActionTypes from '../consts/ActionTypes'

const INITIAL_STATE = {
    user: null,
    accessToken: null,
    isLogged: false
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN:
            const user = action.payload.username;
            const accessToken = action.payload.accessToken
            const isLogged = true;
            return { ...state, user, accessToken, isLogged }
        default:
            return state;
    }
}