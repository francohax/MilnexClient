require('es6-promise').polyfill();
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

import routes from './routes';
import render, {
    setupReducers,
    replaceReducers,
} from '@sketchpixy/rubix/lib/node/redux-router';

import reducers from './redux/reducers';

Messenger.options = {
    theme: 'flat'
};

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status == 401) {
        Messenger().post({
            type: 'error',
            id: 'unauthorized',
            message: 'Unauthorized',
            showCloseButton: true
        });
        browserHistory.push('/login')
    }
    return Promise.reject(error);
});

setupReducers(reducers);
render(routes);

if (module.hot) {
    module.hot.accept('./routes', () => {
        // reload routes again
        require('./routes').default;
        render(routes);
    });

    module.hot.accept('./redux/reducers', () => {
        // reload reducers again
        let newReducers = require('./redux/reducers');
        replaceReducers(newReducers);
    });
}

