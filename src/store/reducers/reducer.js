import { reducer as formReducer } from 'redux-form';
import { home, details, auth, shared } from '../types/types';

import Session from '../../models/session';

const defaultState = {
    session: {
        authorized: new Boolean,
        error: new Boolean,
        message: new String,
        token: new String,
    },
    videos: {},
    snackbar: {},
}

// redux-form reducer should always be injected into combineReducers(), see ./store/config.js:24 and 31
export const form = formReducer;

export const session = (state = defaultState.session, action) => {
    switch (action.type) {
        case auth.LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const videos = (state = defaultState.videos, action) => {
    switch (action.type) {
        case home.FETCH_VIDEOS:
            return action.payload

        default:
            return state;
    }
}

export const snackbar = (state = defaultState.snackbar, action) => {
    switch (action.type) {
        case shared.SNACKBAR_SUCCESS:
            return {
                ...state,
                message: action.message,
            }

        case shared.SNACKBAR_CLEAR:
            return {
                ...state,
                message: undefined,
            }

        default:
            return state;
    }
}