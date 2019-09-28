import ActionTypes from '../consts/ActionTypes';
import { API_LINKS } from '../config/api';
import axios from 'axios';

export const login = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    axios.post(API_LINKS.LOGIN, payloads)
    .then(res => {
        if(res.status == 201){
          dispatch({ type: ActionTypes.LOGIN, payload: res.data });
        } else {
          dispatch({ type: ActionTypes.MESSAGE, payload: res.data.message });
        }
      })
      .catch(err => {
        if(err.response.status == 401) {
          dispatch({ type: ActionTypes.MESSAGE, payload: err.response.data.message });
        } else {
          dispatch({ type: ActionTypes.CONNECTION_ERROR })
        }
       });
       dispatch({ type: ActionTypes.LOADING, payload: false });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, payload: true });
  axios.post(API_LINKS.SIGNUP, payloads)
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, payload: false });
      if(res.status == 201){
        dispatch({ type: ActionTypes.SIGNUP, payload: res.data });
      } else {
        dispatch({ type: ActionTypes.MESSAGE, payload: res.data.message });
      }
    })
    .catch(err => {
      if(err.response.status == 409) {
        dispatch({ type: ActionTypes.MESSAGE, payload: err.response.data.message });
      } 
      if(err.response.status == 400) {
        dispatch({ type: ActionTypes.MESSAGE, payload: err.response.data.message[0].constraints.minLength });
      }
      else {
        dispatch({ type: ActionTypes.CONNECTION_ERROR })
      }
     });
}