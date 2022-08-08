import {
    SET_DATA
} from "./Constants"

const initialState = {
    data: []
}

export const dataReducer = ( state = initialState, {
    type,
    payload
} ) => {
    switch ( type ) {
        case SET_DATA:
            return {
                data: payload.data
            }
            default:
                return state
    }
}