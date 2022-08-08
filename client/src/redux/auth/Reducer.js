import {
    SIGN_IN_USER,
    SIGN_OUT_USER
} from "./Constants"

const initialState = {
    authenticated: false,
    currentUser: null,
    token: null
}

export const authReducer = ( state = initialState, {
    type,
    payload
} ) => {
    switch ( type ) {
        case SIGN_IN_USER:
            return {
                authenticated: true,
                    currentUser: payload.currentUser,
                    token: payload.token
            }
            case SIGN_OUT_USER:
                return initialState
            default:
                return state
    }
}