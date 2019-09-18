// import { Constants } from 'expo';
// const { manifest } = Constants;

// const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//   ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
//   : `localhost`;

const links = {
    apiBaseUrl: 'http://10.0.0.108:3000/',
    login: 'auth/signin',
    signup: 'auth/signup'
}

export const getApiLinkTo = (route) => {
    return links.apiBaseUrl + links[route];
}