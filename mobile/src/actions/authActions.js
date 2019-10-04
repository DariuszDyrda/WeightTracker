import ActionTypes from '../consts/ActionTypes';
import { API_LINKS } from '../config/api';
import axios from 'axios';

export const login = payloads => dispatch => {
    dispatch({ type: ActionTypes.LOADING, payload: true });
    return axios.post(API_LINKS.LOGIN, payloads)
    .then(res => {
      dispatch({ type: ActionTypes.LOADING, payload: false });
        if(res.status == 201){
          dispatch({ type: ActionTypes.LOGIN, payload: res.data });
        } 
        return res;
      })
      .catch(err => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        return err;
      });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, payload: true });
  return axios.post(API_LINKS.SIGNUP, payloads)
    .then(res => {
      dispatch({ type: ActionTypes.LOADING, payload: false });
      return res;
      })
    .catch(err => {
      dispatch({ type: ActionTypes.LOADING, payload: false });
      return err;
     });
}