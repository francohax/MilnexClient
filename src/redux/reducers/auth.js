import * as types from '../actions/actionTypes';

function token(state = '', action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.token;
        case types.SET_TOKEN:
            return action.token;
        case types.LOGOUT:
            return '';
        default:
            return state;
    }
}

function registerErrorMessage(state = '', action) {
    switch (action.type) {
        case types.REGISTER_ERROR:
            return action.error;
        case types.CLEAR_REGISTER_ERROR_MESSAGE:
            return '';
        default:
            return state;
    }
}

function registerSuccessMessage(state = '', action) {
    switch (action.type) {
        case types.REGISTER_SUCCESS:
            return action.message;
        case types.CLEAR_REGISTER_ERROR_MESSAGE:
            return '';
        default:
            return state;
    }
}

function loginErrorMessage(state = '', action) {
    switch (action.type) {
        case types.LOGIN_ERROR:
            return action.error;
        case types.CLEAR_LOGIN_ERROR_MESSAGE:
            return '';
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case types.FETCH_ME_SUCCESS:
            return action.user;
        case types.UPDATE_AVATAR_SUCCESS:
            var user = Object.assign({}, state);
            user.avatar = action.avatar;
            return user;
        default:
            return state;
    }
}

module.exports = {
    token,
    user,
    registerErrorMessage,
    registerSuccessMessage,
    loginErrorMessage
};