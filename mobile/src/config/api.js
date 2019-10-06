const API_BASE_URL = 'http://10.0.0.106:3000/';

export const API_LINKS = {
    LOGIN: 'auth/signin',
    SIGNUP: 'auth/signup',
    GET_WEIGHTS: 'weight',
    POST_WEIGHT: 'weight',
}

Object.keys(API_LINKS).forEach(key => {
    API_LINKS[key] = API_BASE_URL + API_LINKS[key];
})