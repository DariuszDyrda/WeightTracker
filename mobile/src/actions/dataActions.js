import ActionTypes from '../consts/ActionTypes';
import { API_LINKS } from '../config/api';
import axios from 'axios';
import { strings } from '../consts/strings';

export const getWeights = token => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    axios.get(API_LINKS.GET_WEIGHTS, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(res => {
        if(res.status == 200) {
            dispatch({ type: ActionTypes.GET_WEIGHTS, payload: res.data });
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
        } else {
            throw new Error("Connection error");
        }
    })
    .catch(err => {
        dispatch({ type: ActionTypes.CONNECTION_ERROR });
    })
}

export const addWeight = payload => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    axios.post(API_LINKS.POST_WEIGHT, { amount: payload.weight, unit: payload.unit }, {
        headers: {
            "Authorization": `Bearer ${payload.token}`,
        }
    })
    .then(res => {
        dispatch({ type: ActionTypes.LOADING, isLoading: false });
        if(res.status == 201) {
            dispatch({ type: ActionTypes.MESSAGE, payload: strings.ADD_WEIGHT_SUCCESS });
        } else {
            throw new Error("Connection error");
        }
    })
    .catch(err => {
        dispatch({ type: ActionTypes.CONNECTION_ERROR });
    })
}