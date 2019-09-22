import ActionTypes from "../consts/ActionTypes"

const INITIAL_STATE = {
    weights: [],
}

export const dataReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.GET_WEIGHTS: {
            const weights = action.payload;
            return { ...state, weights };
        }
        default:
            return state;
    }
}