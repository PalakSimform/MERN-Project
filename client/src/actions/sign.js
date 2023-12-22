import * as api from '../api/index.js';
import { SIGN } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signinUser(formData);
        console.log('data', data)
        dispatch({type: SIGN, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUpUser(formData);
        dispatch({type: SIGN, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}