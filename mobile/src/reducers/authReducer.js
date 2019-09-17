import ActionTypes from '../consts/ActionTypes'

const INITIAL_STATE = {
    user: null,
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN:
            const user = action.payload;
            return { user }
        default:
            return state;
    }
}