import ActionTypes from '../consts/ActionTypes';
import { API_LINKS } from '../config/api';
import axios from 'axios';
import { strings } from '../consts/strings';

export const getWeights = token => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    return axios.get(API_LINKS.GET_WEIGHTS, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(res => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        if(res.status == 200) {
            dispatch({ type: ActionTypes.GET_WEIGHTS, payload: res.data });
            return res;
        } else {
            throw new Error("Connection error");
        }
    })
}


export const addWeight = payload => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    return axios.post(API_LINKS.POST_WEIGHT, { amount: payload.weight, unit: payload.unit, date: payload.date }, {
        headers: {
            "Authorization": `Bearer ${payload.token}`,
        }
    })
    .then(res => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        if(res.status == 201) {
            dispatch({ type: ActionTypes.MESSAGE, payload: strings.ADD_WEIGHT_SUCCESS });
            return res;
        } else {
            throw new Error("Connection error");
        }
    })
}

export const editWeight = payload => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    const { editId, token, weight, ...otherPayloads } = payload;
    return axios.put(API_LINKS.POST_WEIGHT + `/${editId}`, { amount: weight, ...otherPayloads }, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(res => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        if(res.status == 200) {
            dispatch({ type: ActionTypes.MESSAGE, payload: strings.EDIT_WEIGHT_SUCCESS });
            return res;
        } else {
            throw new Error("Connection error");
        }
    })
}

export const deleteWeight = payload => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    const { editId, token } = payload;
    return axios.delete(API_LINKS.POST_WEIGHT + `/${editId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(res => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        if(res.status == 200) {
            dispatch({ type: ActionTypes.MESSAGE, payload: strings.DELETE_WEIGHT_SUCCESS });
            return res;
        } else {
            throw new Error("Connection error");
        }
    })
}