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

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  axios.post(getApiLinkTo('signup'), payloads)
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 201){
        dispatch({ type: ActionTypes.SIGNUP, payload: res.data });
      } else {
        dispatch({ type: ActionTypes.SIGNUP_ERROR, payload: res.data.message });
      }
    })
    .catch(err => {
      if(err.response.status == 409) {
        dispatch({ type: ActionTypes.SIGNUP_ERROR, payload: err.response.data.message });
      } 
      if(err.response.status == 400) {
        dispatch({ type: ActionTypes.SIGNUP_ERROR, payload: err.response.data.message[0].constraints.minLength });
      }
      else {
        dispatch({ type: ActionTypes.CONNECTION_ERROR })
      }
     });
}