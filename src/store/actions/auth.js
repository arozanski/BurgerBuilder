import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    };
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
}

export const signOut = () => {
    return {
        type: actionsTypes.AUTH_SIGNOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signOut());
        }, expTime * 1000);
    }
}

export const auth = (email, password, isSignin) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const urlPartial = isSignin ? 'verifyPassword' : 'signupNewUser';
        
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlPartial}?key=AIzaSyCPrvl8L0hcTD8ahW9dc4wwWYXZc_k_jE0`, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const authSetRedirect = (path) => {
    return {
        type: actionsTypes.AUTH_SET_REDIRECT,
        path: path
    }
};
