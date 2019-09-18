import ActionTypes from '../consts/ActionTypes';
import { getApiLinkTo } from '../config/api';
import axios from 'axios';

export const login = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, isLoading: true });
    axios.post(getApiLinkTo('login'), payloads)
    .then(res => {
      dispatch({ type: ActionTypes.LOADING, isLoading: false });
        if(res.status == 201){
          dispatch({ type: ActionTypes.LOGIN, payload: res.data });
        } else {
          dispatch({ type: ActionTypes.LOGIN_ERROR, payload: res.data.message });
        }
      })
      .catch(err => {
        if(err.response.status == 401) {
          dispatch({ type: ActionTypes.LOGIN_ERROR, payload: err.response.data.message });
        } else {
          dispatch({ type: ActionTypes.CONNECTION_ERROR })
        }
       });
    }