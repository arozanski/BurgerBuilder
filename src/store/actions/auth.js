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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

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
                const expDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expDate);
                localStorage.setItem('userId', response.data.localId);

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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            dispatch(signOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(signOut());
            } else {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}
