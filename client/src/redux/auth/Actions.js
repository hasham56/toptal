import {
    SIGN_IN_USER,
    SIGN_OUT_USER
} from './Constants'

export const signInUser = ( data ) => {
    return {
        type: SIGN_IN_USER,
        payload: data
    }
}

export const signOutUser = () => {
    return {
        type: SIGN_OUT_USER
    }
}