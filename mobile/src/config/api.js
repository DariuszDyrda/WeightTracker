// import { Constants } from 'expo';
// const { manifest } = Constants;

// const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//   ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
//   : `localhost`;

const apiBaseUrl = 'http://10.0.0.107:3000/';

export const API_LINKS = {
    LOGIN: 'auth/signin',
    SIGNUP: 'auth/signup',
    GET_WEIGHTS: 'weight',
}

Object.keys(API_LINKS).forEach(key => {
    API_LINKS[key] = apiBaseUrl + API_LINKS[key];
})