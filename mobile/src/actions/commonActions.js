import ActionTypes from '../consts/ActionTypes'

export const loading = isLoading => (
    {
        type: ActionTypes.LOADING,
        payload: isLoading,
    }
)

export const clearMessages = () => (
    {
        type: ActionTypes.CLEAR_MESSAGES,
    }
)