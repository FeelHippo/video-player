import api from '../../services/api';
import { auth, shared } from '../types/types';
import LocalStorage from '../../services/storage';
const { registerUser, loginUser, tokenAuthentication } = api();

export const userPostLogin = user => {
    return async dispatch => {
        try {
            let response = await loginUser(user);
            let token = response.data.token;
            let authenticated = await tokenAuthentication(token);
            if (authenticated && response.status === 200) {
                LocalStorage.setTokenStorage(token);
                dispatch(loginAuthUser(response.data));
                return true;
            } else {
                dispatch(showSnackbar(response.data.msg))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const loginAuthUser = userObj => ({
    type: auth.LOGIN_USER,
    payload: userObj,
})

export const userPostSignup = user => {
    return async dispatch => {
        try {
            let response = await registerUser(user);
            if (response.status === 200) {
                dispatch(signupUser(response.data.success));
                return true;
            }
        } catch (error) {
            dispatch(showSnackbar(response.data.msg));
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