import {
    SET_DATA,
} from './Constants'

export const setData = ( data ) => {
    return {
        type: SET_DATA,
        payload: data
    }
}