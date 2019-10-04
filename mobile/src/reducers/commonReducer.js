import ActionTypes from '../consts/ActionTypes'

const INITIAL_STATE = {
    isLoading: false,
}

export const commonReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.LOADING: {
            const isLoading = action.payload;
            return {...state, isLoading};
        }
        default:
            return state;
    }
}
