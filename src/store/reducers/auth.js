import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: null
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.localId,
        error: null, 
        loading: false
    });
}

const signOut = (state, action) => {
    return updateObject(state, { token: null, userId: null});
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SIGNOUT: return signOut(state, action);
        default: 
            return state;
    }
}

export default reducer;