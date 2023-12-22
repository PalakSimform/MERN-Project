/* eslint-disable no-fallthrough */
import * as actionType from '../constants/actionTypes.js';

const signReducer = (state = { signData: null }, action) => {

    console.log('action', action) 
    switch (action.type) {
        case actionType.SIGN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, signData: action.data, loading: false, errors: null }
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, signData: null, loading: false, errors: null }
        default:
            return state;
    }
}

export default signReducer;