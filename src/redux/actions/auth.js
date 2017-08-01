import {
    LOGIN_SUCCESS,
    FETCH_ME_SUCCESS,
    LOGOUT,
    REGISTER_ERROR,
    CLEAR_REGISTER_ERROR_MESSAGE,
    CLEAR_REGISTER_SUCCESS_MESSAGE,
    REGISTER_SUCCESS,
    LOGIN_ERROR,
    CLEAR_LOGIN_ERROR_MESSAGE,
    SET_TOKEN} from './actionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';

function login(email, password) {
    return dispatch => {
        dispatch({type: CLEAR_LOGIN_ERROR_MESSAGE, String});
        return axios.post('/authenticate', {username: email, password: password}).then(res => {
            var token = res.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
            dispatch({type: LOGIN_SUCCESS, token});
            browserHistory.push('/');
        }, function(res) {
            let error = res.response.data.error;
            dispatch({type: LOGIN_ERROR, error});
        });
    };
}

function register(username, email, password) {
    return dispatch => {
        dispatch({type: CLEAR_REGISTER_ERROR_MESSAGE, String});
        dispatch({type: CLEAR_REGISTER_SUCCESS_MESSAGE, String});
        return axios.post('/register', {username: username, email: email, password: password}).then(res => {
            let message = res.data.message;
            dispatch({type: REGISTER_SUCCESS, message});
        }, (res) => {
            let error = res.response.data.error;
            dispatch({type: REGISTER_ERROR, error});
        });
    };
}

function setToken() {
    return dispatch => {
        let token = localStorage.getItem('token');
        dispatch({type: SET_TOKEN, token});
    };
}

function fetchMe() {
    return dispatch => {
        return axios.get('/api/users/me').then(res => {
            var user = res.data;
            dispatch({type: FETCH_ME_SUCCESS, user});
        });
    };
}

function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({type: LOGOUT});
    };
}

module.exports = {
    login,
    fetchMe,
    logout,
    register,
    setToken
};