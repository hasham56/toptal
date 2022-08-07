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
                currentUser: {
                    username: payload.username,
                    email: payload.email,
                    role: payload.role
                },
                token: payload.token
            }
            case SIGN_OUT_USER:
                return {
                    authenticated: false,
                    currentUser: null,
                    token: null
                }
                default:
                    return state
    }
}