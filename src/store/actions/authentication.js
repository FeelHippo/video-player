import api from '../../services/api';
import { auth, shared } from '../types/types';
import LocalStorage from '../../services/storage';
const { defaultUser, registerUser, loginUser, tokenAuthentication } = api();

export const userPostLogin = () => {
    return async dispatch => {
        try {
            let response = await defaultUser();
            if (response.authorized) {
                dispatch(loginAuthUser(response));
                return true;
            } else {
                dispatch(showSnackbar(response.message))
                return false;
            }
        } catch (error) {
            dispatch(showSnackbar(error));
        }
    }
}

const loginAuthUser = userObj => ({
    type: auth.LOGIN_USER,
    payload: userObj,
})

export const userPostSignup = user => {
    return async dispatch => {
        let response = await registerUser(user);
        try {
            if (response.data.success === true) {
                dispatch(signupUser(response.data.success));
                dispatch(showSnackbar('You are now registered!'))
                return true;
            } else if (response.data.success === false) {
                dispatch(showSnackbar(response.data.msg))
                return false;
            }
        } catch (error) {
            dispatch(showSnackbar(error));
        }
    }
}

const signupUser = success => ({
    type: auth.SIGNUP_USER,
    payload: success,
})

export const logoutUser = () => {
    return {
        type: auth.LOGOUT_USER,
    }
}

const showSnackbar = message => ({
    type: shared.SNACKBAR_SUCCESS,
    message,
})

export const clearSnackbar = () => ({
    type: shared.SNACKBAR_CLEAR,
})