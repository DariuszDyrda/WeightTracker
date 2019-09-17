import ActionTypes from '../consts/ActionTypes'

export const login = username => password => (
    {
        type: ActionTypes.LOGIN,
        payload: username
    }
)